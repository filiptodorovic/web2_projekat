using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace backendShop.Models
{
    public enum ValidationState {PROCESSING=0,DENIED=1,APPROVED=2 }
    public class Seller
    {
        [Key]
        [ForeignKey("User")]
        public string Email { get; set; }
        public virtual User User { get; set; }     // Navigation property to User
        public virtual List<Product> Products { get; set; }     // List of Products
        public ValidationState ValidationState { get; set; }
        public int ShippingConst { get; set; }

    }
}
