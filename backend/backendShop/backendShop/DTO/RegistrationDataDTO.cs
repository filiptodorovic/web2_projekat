using backendShop.Models;
using System;

namespace backendShop.DTO
{
    public class RegistrationDataDTO
    {
        public string Email { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string DateOfBirth { get; set; }
        public string Address { get; set; }
        public byte[] PictureUrl { get; set; }
        public UserType UserType { get; set; }
    }
}
