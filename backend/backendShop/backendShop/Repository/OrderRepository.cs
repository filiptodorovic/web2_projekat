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
    }

}
