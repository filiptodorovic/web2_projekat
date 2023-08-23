using backendShop.Models;
using System.Collections.Generic;
using System;

namespace backendShop.DTO
{
    public class UserDTO
    {
        public int UserId { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Address { get; set; }
        public string PictureUrl { get; set; }
        public UserType UserType { get; set; }
        public VerificationStatus VerificationStatus { get; set; }
        public int DeliveryCost { get; set; }

    }
}
