﻿namespace backendShop.Models
{
    public class OrderProduct
    {
        public int OrderItemId { get; set; }  // Primary key
        public int OrderId { get; set; }
        public virtual Order Order { get; set; }
        public int ProductId { get; set; }
        public virtual Product Product { get; set; }
        public int Quantity { get; set; }
    }
}
