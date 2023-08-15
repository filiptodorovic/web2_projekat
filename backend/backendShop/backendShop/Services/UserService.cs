using backendShop.Data;
using backendShop.DTO;
using backendShop.Interfaces;
using backendShop.Models;
using backendShop.Repository;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backendShop.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        public UserService(IUserRepository repo) { _userRepository=repo; }

        public async Task<UserDTO> RegisterUser(RegistrationDataDTO regdata)
        {

            // Check everything if its okay in terms if the user exists already and if data is correct
            //List<User>? users = await _userRepository.GetAllUsers();

            User newUser = new User();

            if (regdata!=null) {
                newUser.Password = regdata.Password;
                newUser.Email = regdata.Email;
                newUser.PictureUrl = "";
                newUser.Name = regdata.Name;
                newUser.LastName = regdata.LastName;
                newUser.Username = regdata.Username;
                newUser.Address  = regdata.Address;
                newUser.DateOfBith=regdata.DateOfBith;
                newUser.UserType=regdata.UserType;
                if (regdata.UserType == UserType.SELLER) {
                    newUser.DeliveryCost = 100;
                }
            }


            User writtenUser = await _userRepository.Register(newUser);
            // Use mapper for UserDTO

            UserDTO retUserDTO = new UserDTO();
            return retUserDTO;
        }
    }
}
