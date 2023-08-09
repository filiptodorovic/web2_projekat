using System;
using System.ComponentModel.DataAnnotations;

namespace backendShop.Models
{
    public enum UserType {ADMIN=0, SELLER=1, BUYER=2};
    public class User
    {
        [Key]
        public string Email { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBith { get; set; }
        public string Address { get; set; }
        public UserType UserType { get; set; }
        public string PictureUrl { get; set; }


        // Navigation properties for related entities
        public virtual Seller Seller { get; set; }
        public virtual Buyer Buyer { get; set; }
        public virtual Admin Admin { get; set; }

    }
}
