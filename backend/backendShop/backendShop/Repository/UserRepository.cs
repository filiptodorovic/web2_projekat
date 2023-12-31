﻿using backendShop.Data;
using backendShop.Interfaces.RepositoryInterfaces;
using backendShop.Models;
using System;
using System.Collections.Generic;
using System.Linq;
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
        public async Task<User> AddUser(User u)
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

        public async Task<List<User>> GetAllUsers()
        {
            return _context.Users.ToList();
        }

        public async Task<bool> UpdateUser(User u)
        {
            _context.Update(u);
            _context.SaveChanges();
            return true;

        }
    }
}
