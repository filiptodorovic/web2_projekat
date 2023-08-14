using System.Collections.Generic;

namespace backendShop.Models
{
    public class Product
    {

        public int ProductId { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public int Amount { get; set; }
        public string Description { get; set; }
        public string PictureUrl { get; set; }
        public string SellerEmail { get; set; }
        public virtual User User { get; set; }
        public int UserId { get; set; }
        public virtual List<OrderProduct> OrderItems { get; set; }

    }
}
