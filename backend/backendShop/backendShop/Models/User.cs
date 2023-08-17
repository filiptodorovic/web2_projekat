using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace backendShop.Models
{
    public enum UserType {ADMIN=0, SELLER=1, BUYER=2};
    public enum VerificationStatus {APPROVED=0, DENIED=1, PENDING=2};
    public class User
    {
        public int UserId { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string DateOfBith { get; set; }
        public string Address { get; set; }
        public string PictureUrl { get; set; }
        public UserType UserType { get; set; }
        public VerificationStatus VerificationStatus { get; set; }
        public List<Order>? Orders { get; set; }
        public List<Product>? Products { get; set; }
        public int DeliveryCost { get; set; }

    }
}
