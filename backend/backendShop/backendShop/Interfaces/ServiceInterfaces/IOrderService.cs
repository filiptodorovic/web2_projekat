using backendShop.DTO;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backendShop.Interfaces.ServiceInterfaces
{
    public interface IOrderService
    {
        Task<bool> CreateOrder(int id, OrderDTO newOrder);
        Task<List<OrderDTO>> GetAllOrders();
    }
}
