using AutoMapper;
using backendShop.Data;
using backendShop.DTO;
using backendShop.Interfaces.RepositoryInterfaces;
using backendShop.Interfaces.ServiceInterfaces;
using backendShop.Models;
using backendShop.Repository;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
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
        private readonly IHelperService _helperService;
        public UserService(IUserRepository repo, IMapper mapper, IConfiguration configuration, IHelperService helperService) { 
            _userRepository=repo;
            _mapper = mapper;
            _configuration = configuration;
            _helperService = helperService;
        }


        public async Task<UserDTO> RegisterUser(RegistrationDataDTO regdata)
        {
            List<User>? users = await _userRepository.GetAllUsers();


            //Check if the inputs are empty
            if(users.Find(u => u.Email == regdata.Email)!=null || users.Find(u => u.Username == regdata.Username) != null)
                throw new Exception("Email and/or username already in use!");

            User newUser = new User();

            if (regdata!=null) {
                newUser.Password = await _helperService.ComputeSha256Hash(regdata.Password);
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


            User writtenUser = await _userRepository.AddUser(newUser);

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

            if(!foundUser.Password.Equals(await _helperService.ComputeSha256Hash(loginData.Password)))
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

        public async Task<List<SellerDTO>> GetAllSellers() {
            List<User>? users = await _userRepository.GetAllUsers();

            List<User> sellers = users.FindAll(u => u.UserType == UserType.SELLER);

            List<SellerDTO> retSellers = new List<SellerDTO>();

            foreach (User u in sellers) {
                SellerDTO seller = new SellerDTO();
                seller.Email=u.Email;
                seller.Username = u.Username;
                seller.VerificationStatus = u.VerificationStatus;
                retSellers.Add(seller);
            }

            return retSellers;
        }

        public async Task<List<SellerDTO>> SellerService(string sellerEmail, SellerApprovalActions action)
        {
            List<User>? users = await _userRepository.GetAllUsers();

            User user = users.FirstOrDefault(u => u.Email == sellerEmail);
            if (user == null)
                throw new Exception("Seller not found in the DB!");

            if (user.UserType!=UserType.SELLER)
                throw new Exception("The user is not seller!");

            if(user.VerificationStatus!=VerificationStatus.PENDING)
                throw new Exception($"Seller has already been {user.VerificationStatus.ToString()}");



            if (action == SellerApprovalActions.APPROVE)
            {
                user.VerificationStatus = VerificationStatus.APPROVED;
            }
            else
            {
                user.VerificationStatus = VerificationStatus.DENIED;
            }



            try {
                bool result = await _userRepository.UpdateUser(user);
            }
            catch (Exception ex) {
                throw ex;
            }

            //Email message
            string message = $"Dear {user.Username},\n\nYou have been {user.VerificationStatus.ToString()}.\n\nBest Regards,\nBackend Server\n";

            try
            {
                _helperService.SendEmail("trecagodinapsi@gmail.com", message);// I am using a personal email so I don't spam people
            }
            catch (Exception ex) { 
                //Do nothing :(
            }

            users = await _userRepository.GetAllUsers();
            List<User> sellers = users.FindAll(u => u.UserType == UserType.SELLER);


            List<SellerDTO> retSellers = new List<SellerDTO>();

            foreach (User u in sellers)
            {
                SellerDTO s = new SellerDTO();
                s.Email = u.Email;
                s.Username = u.Username;
                s.VerificationStatus = u.VerificationStatus;
                retSellers.Add(s);
            }

            return retSellers;
        }

        public async Task<UserDTO> UploadImageToProfile(int userId, PhotoUploadDTO photo)
        {
            List<User>? users = await _userRepository.GetAllUsers();

            User user = users.FirstOrDefault(u => u.UserId == userId);
            if (user == null)
                throw new Exception("User not found in the DB!");

            if(photo==null || photo.Picture==null)
                throw new Exception("Image cannot be null!");

            string extension = ".jpg";
            string fileName = Path.ChangeExtension(
                Path.GetRandomFileName(),
                extension
            );

            string path = String.Format("{0}{1}", _configuration["ImageStoragePath"], fileName);

            using (var ms = new MemoryStream(photo.Picture))
            {
                using (var fs = new FileStream(path, FileMode.Create))
                {
                    ms.WriteTo(fs);
                }
            }

            string imageAccessPath = String.Format("{0}{1}", _configuration["ImageAccessPath"], fileName);


            user.PictureUrl = imageAccessPath;

            await _userRepository.UpdateUser(user);

            return _mapper.Map<User, UserDTO>(user);

        }

        public async Task<UserDTO> EditUser(int id, UserDTO updateData)
        {
            List<User>? users = await _userRepository.GetAllUsers();
            User user = users.FirstOrDefault(u => u.UserId == id);

            if (user == null)
                throw new Exception("User not found in the DB!");

            if (updateData.Username!=null)
                user.Username = updateData.Username;

            if (updateData.Email != null)
                user.Email = updateData.Email;

            if (updateData.Name != null)
                user.Name = updateData.Name;

            if (updateData.LastName != null)
                user.LastName = updateData.LastName;

            if (updateData.DateOfBirth > DateTime.MinValue) {
                int year = updateData.DateOfBirth.Year;
                int month = updateData.DateOfBirth.Month;
                int day = updateData.DateOfBirth.Day;

                user.DateOfBirth = string.Format("{0}-{1}-{2}",year,month,day);

            }

            if (updateData.Address != null)
                user.Address = updateData.Address;

            await _userRepository.UpdateUser(user);

            return _mapper.Map<User, UserDTO>(user);
        }

        public async Task<UserDTO> GoogleRegisterUser(RegistrationDataDTO regdata)
        {
            List<User>? users = await _userRepository.GetAllUsers();

            if (users.Find(u => u.Email == regdata.Email) != null || users.Find(u => u.Username == regdata.Username) != null)
                throw new Exception("Email and/or username already in use!");

            User newUser = new User();

            newUser.Email = regdata.Email;
            newUser.Name = regdata.Name;
            newUser.LastName = regdata.LastName;
            newUser.Username = regdata.Email;
            //Only buyers can register via google :/
            newUser.UserType = UserType.BUYER;
            newUser.DateOfBirth = "1970-01-01";
            newUser.Address = "<Enter Address Here>";
            newUser.Password = await _helperService.ComputeSha256Hash(newUser.Email);

            User writtenUser = await _userRepository.AddUser(newUser);

            UserDTO retUserDTO = _mapper.Map<User, UserDTO>(writtenUser);
            return retUserDTO;
        }

        public async Task<string> GoogleLoginUser(string GoogleLoginToken)
        {
            try
            {
                var validationSettings = new GoogleJsonWebSignature.ValidationSettings()
                {
                    Audience = new List<string>() { _configuration["GoogleClientID"] }
                };

                var googleUserInfo = await GoogleJsonWebSignature.ValidateAsync(GoogleLoginToken, validationSettings);

                List<User>? users = await _userRepository.GetAllUsers();

                User foundUser = users.Find(u => u.Email == googleUserInfo.Email);

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
            catch (Exception ex) { throw ex; }
        }
    }
}
