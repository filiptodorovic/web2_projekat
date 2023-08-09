using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace backendShop.Models
{
    public class Admin
    {
        [Key]
        [ForeignKey("User")]
        public string Email { get; set; }
        public virtual User User { get; set; }      // Navigation property to User
    }
}
