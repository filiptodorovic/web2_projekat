using System.Collections.Generic;
using System;

namespace backendShop.DTO
{
    public class OrderDTO
    {
        public int OrderId { get; set; }
        public DateTime TimeOrdered { get; set; }
        public bool IsCancelled { get; set; }
        public string Comment { get; set; }
        public string Address { get; set; }
        public float TotalCost { get; set; }
        public int UserId { get; set; }
        public List<OrderProductDTO>? OrderItems { get; set; }
    }
}
