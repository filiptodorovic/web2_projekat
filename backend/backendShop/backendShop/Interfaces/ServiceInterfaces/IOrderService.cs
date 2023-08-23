using backendShop.DTO;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backendShop.Interfaces.ServiceInterfaces
{
    public interface IOrderService
    {
        Task<bool> CreateOrder(int id, OrderDTO newOrder);
        Task<List<OrderDTO>> GetAllOrders();
        Task<List<OrderDTO>> GetAllUserOrders(int userId);
        Task<List<OrderDTO>> CancelOrder(int userId, int orderId);
        Task<List<OrderDTO>> GetSellerNewOrders(int userId);
        Task<List<OrderDTO>> GetSellerOldOrders(int userId);
    }
}
