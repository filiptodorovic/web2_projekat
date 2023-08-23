using backendShop.Models;

namespace backendShop.DTO
{
    public class OrderProductDTO
    {
        public int OrderId { get; set; }
        public virtual OrderDTO Order { get; set; }
        public int ProductId { get; set; }
        public virtual ProductDTO Product { get; set; }
        public int Quantity { get; set; }
    }
}
