using backendShop.Data;
using backendShop.Interfaces.RepositoryInterfaces;
using backendShop.Models;
using System.Threading.Tasks;
using System;
using System.Linq;
using System.Collections.Generic;

namespace backendShop.Repository
{
    public class OrderRepository : IOrderRepository
    {
        private readonly DataContext _context;
        public OrderRepository(DataContext context) { 
            _context = context;
        }

        public async Task<bool> AddOrder(Order o)
        {
            _context.Orders.Add(o);
            try
            {
                _context.SaveChanges();
                return true;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<List<OrderProduct>> GetAllOrderItems()
        {
            return _context.OrderItems.ToList();
        }

        public async Task<List<Order>> GetAllOrders()
        {
            return _context.Orders.ToList();
        }

        public async Task<bool> UpdateOrder(Order o)
        {
            _context.Update(o);
            _context.SaveChanges();
            return true;
        }
    }

}
