using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace backendShop.Models
{
    public class Buyer:User
    {
        public virtual List<Order> Orders { get; set; }
    }
}
