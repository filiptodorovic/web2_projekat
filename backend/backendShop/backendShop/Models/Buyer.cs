using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace backendShop.Models
{
    public class Buyer
    {
        [Key]
        [ForeignKey("User")]
        public string Email { get; set; }
        public virtual User User { get; set; }      // Navigation property to User
        public virtual List<Order> Orders { get; set; }
    }
}
