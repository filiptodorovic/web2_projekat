using AutoMapper;
using backendShop.Data;
using backendShop.DTO;
using backendShop.Interfaces;
using backendShop.Models;
using backendShop.Repository;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace backendShop.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        public UserService(IUserRepository repo, IMapper mapper, IConfiguration configuration) { 
            _userRepository=repo;
            _mapper = mapper;
            _configuration = configuration;
        }

        static string ComputeSha256Hash(string rawData)
        {
            // Create a SHA256
            using (SHA256 sha256Hash = SHA256.Create())
            {
                // ComputeHash - returns byte array
                byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(rawData));

                // Convert byte array to a string
                StringBuilder builder = new StringBuilder();
                for (int i = 0; i < bytes.Length; i++)
                {
                    builder.Append(bytes[i].ToString("x2"));
                }
                return builder.ToString();
            }
        }


        public async Task<UserDTO> RegisterUser(RegistrationDataDTO regdata)
        {
            List<User>? users = await _userRepository.GetAllUsers();


            //Check if the inputs are empty
            if(users.Find(u => u.Email == regdata.Email)!=null || users.Find(u => u.Username == regdata.Username) != null)
                throw new Exception("Email and/or username already in use!");

            User newUser = new User();

            if (regdata!=null) {
                newUser.Password = ComputeSha256Hash(regdata.Password);
                newUser.Email = regdata.Email;
                newUser.PictureUrl = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
                newUser.Name = regdata.Name;
                newUser.LastName = regdata.LastName;
                newUser.Username = regdata.Username;
                newUser.Address  = regdata.Address;
                newUser.DateOfBirth = regdata.DateOfBirth;

                newUser.UserType=regdata.UserType;
                if (regdata.UserType == UserType.SELLER) {
                    newUser.DeliveryCost = 100;
                    newUser.VerificationStatus = VerificationStatus.PENDING;
                }
            }


            User writtenUser = await _userRepository.Register(newUser);

            UserDTO retUserDTO = _mapper.Map<User, UserDTO>(writtenUser);
            return retUserDTO;
        }


        public async Task<string> LoginUser(LoginDataDTO loginData)
        {
            List<User>? users = await _userRepository.GetAllUsers();

            User foundUser = users.Find(u => u.Email == loginData.Email);

            if(loginData==null)
                throw new Exception("No login data provided!");

            if (loginData.Email.Equals("") || loginData.Password.Equals(""))
                throw new Exception("Email and/or password cannot be empty");

            if (foundUser==null)
                throw new Exception("The user with given email does not exist!");

            if(!foundUser.Password.Equals(ComputeSha256Hash(loginData.Password)))
                throw new Exception("Invalid password!");


            var claims = new[] {
                    new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Iat,DateTime.UtcNow.ToString()),
                    new Claim("UserId",foundUser.UserId.ToString()),
                    new Claim("Email",foundUser.Email.ToString()),
                    new Claim(ClaimTypes.Role,foundUser.UserType.ToString().ToUpper()),
                    new Claim("VerificationStatus",foundUser.VerificationStatus.ToString().ToUpper())
            };



            SymmetricSecurityKey secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Key"]));
            var signIn = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                _configuration["JWT:Issuer"],
                _configuration["JWT:Audience"],
                claims,
                expires: DateTime.UtcNow.AddDays(1),
                signingCredentials: signIn);

            return new JwtSecurityTokenHandler().WriteToken(token);

        }

        public async Task<UserDTO> GetUserById(int id)
        {
            List<User>? users = await _userRepository.GetAllUsers();

            User user = users.Find(u => u.UserId == id);

            if (user == null)
                throw new Exception("User not found in the database!");


            UserDTO retUserDTO = _mapper.Map<User, UserDTO>(user);

            return retUserDTO;

        }
    }
}
