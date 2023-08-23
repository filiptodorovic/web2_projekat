using backendShop.Models;

namespace backendShop.DTO
{
    public class ProductDTO
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public float Price { get; set; }
        public int Amount { get; set; }
        public byte[] Picture { get; set; }
        public string PictureUrl { get; set; }
    }
}
