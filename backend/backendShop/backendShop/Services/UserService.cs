using backendShop.Data;
using backendShop.DTO;
using backendShop.Interfaces;
using backendShop.Models;
using Microsoft.EntityFrameworkCore;

namespace backendShop.Services
{
    public class UserService : IUserService
    {
        private readonly DataContext _context;
        public UserService(DataContext context) { _context = context; }

        public bool RegisterUser(RegistrationDataDTO regdata)
        {
            if (regdata!=null) {
                User user = new User();
                user.Password = regdata.Password;
                user.Email = regdata.Email;
                user.PictureUrl = "";
                user.Name = regdata.Name;
                user.LastName = regdata.LastName;
                user.Username = regdata.Username;
                user.Address  = regdata.Address;
                user.DateOfBith=regdata.DateOfBith;
                user.UserType=regdata.UserType;
                if (regdata.UserType == UserType.SELLER) {
                    user.DeliveryCost = 100;
                }

                _context.Users.Add(user);
                _context.SaveChanges();

            }


            return true;
        }
    }
}
