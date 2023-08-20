using backendShop.Models;
using System.Threading.Tasks;

namespace backendShop.Interfaces.RepositoryInterfaces
{
    public interface IOrderRepository
    {
        Task<bool> AddOrder(Order o);
    }
}
