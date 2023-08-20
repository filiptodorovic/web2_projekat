using System;
using System.Collections.Generic;

namespace backendShop.Models
{
    public class Order
    {
        public int OrderId { get; set; }
        public DateTime TimeOrdered { get; set; }
        public bool IsCancelled { get; set; }
        public string Comment { get; set; }
        public string Address { get; set; }
        public float TotalCost { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }

        public virtual List<OrderProduct>? OrderItems { get; set; }
    }
}
