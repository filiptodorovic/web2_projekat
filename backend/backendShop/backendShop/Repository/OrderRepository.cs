using backendShop.Data;
using backendShop.Interfaces.RepositoryInterfaces;
using backendShop.Models;
using System.Threading.Tasks;
using System;

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
    }

}
