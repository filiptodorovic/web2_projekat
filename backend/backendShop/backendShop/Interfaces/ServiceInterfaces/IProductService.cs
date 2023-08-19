using backendShop.DTO;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backendShop.Interfaces.ServiceInterfaces
{
    public interface IProductService
    {
        Task<List<ProductDTO>> AddProduct(int sellerId, ProductDTO newProduct);
        Task<List<ProductDTO>> GetAllSellerProducts(int sellerId);
        Task<List<ProductDTO>> RemoveProduct(int sellerId, ProductDTO productToRemove);

    }
}
