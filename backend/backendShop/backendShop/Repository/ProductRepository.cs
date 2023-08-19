using backendShop.Data;
using backendShop.Interfaces.RepositoryInterfaces;
using backendShop.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backendShop.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly DataContext _context;

        public ProductRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<bool> AddProduct(Product p)
        {
            _context.Products.Add(p);
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

        public async Task<List<Product>> GetAllProducts()
        {
            return _context.Products.ToList();
        }

        public async Task<bool> UpdateProduct(Product p)
        {
            _context.Update(p);
            _context.SaveChanges();
            return true;
        }
    }
}
