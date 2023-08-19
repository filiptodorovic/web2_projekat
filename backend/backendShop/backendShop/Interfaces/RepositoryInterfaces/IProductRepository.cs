using backendShop.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backendShop.Interfaces.RepositoryInterfaces
{
    public interface IProductRepository
    {
        Task<List<Product>> GetAllProducts();
        Task<bool> AddProduct(Product p);
        Task<bool> UpdateProduct(Product p);
    }
}
