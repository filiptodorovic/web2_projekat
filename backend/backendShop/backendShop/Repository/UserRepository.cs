using backendShop.Data;
using backendShop.Interfaces;
using backendShop.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backendShop.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;

        public UserRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<User> Register(User u)
        {
            _context.Users.Add(u);
            try
            {
                _context.SaveChanges();
                return u;
            }
            catch (Exception e) {
                return null;
            }
        }

        Task<List<User>> IUserRepository.GetAllUsers()
        {
            return null;
        }
    }
}
