using System.Collections.Generic;

namespace backendShop.Models
{
    public class Product
    {

        public int ProductId { get; set; }
        public string Name { get; set; }
        public float Price { get; set; }
        public int Amount { get; set; }
        public string Description { get; set; }
        public byte[] Picture { get; set; }
        public string SellerEmail { get; set; }
        public virtual User User { get; set; }
        public int UserId { get; set; }
        public virtual List<OrderProduct> OrderItems { get; set; }
        public bool isDeleted { get; set; }

    }
}
