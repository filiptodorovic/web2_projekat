using AutoMapper;
using backendShop.DTO;
using backendShop.Interfaces.RepositoryInterfaces;
using backendShop.Interfaces.ServiceInterfaces;
using backendShop.Models;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;

namespace backendShop.Services
{
    public class OrderService : IOrderService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        private readonly IProductRepository _productRepository;
        private readonly IOrderRepository _orderRepository;
        public OrderService(IProductRepository productRepository, IUserRepository userRepo, IMapper mapper, IConfiguration configuration, IOrderRepository orderRepository)
        {
            _userRepository = userRepo;
            _mapper = mapper;
            _configuration = configuration;
            _productRepository = productRepository;
            _orderRepository = orderRepository;
        }

        public async Task<bool> CreateOrder(int id, OrderDTO newOrder)
        {
            List<User>? users = await _userRepository.GetAllUsers();

            User foundBuyer = users.Find(u => u.UserId == id);

            if (foundBuyer == null)
                throw new Exception("Buyer not found in the DB!");

            Order order = new Order();

            order.OrderItems = new List<OrderProduct>();
            order.Comment = newOrder.Comment;
            order.Address = newOrder.Address;
            order.TimeOrdered = DateTime.Now;
            order.IsCancelled = false;
            order.User = foundBuyer;
            order.UserId = id;
            
            List<Product> products = await _productRepository.GetAllProducts();

            bool isEnoughQuantity = true;

            foreach (var orderItem in newOrder.OrderItems) {
                var product = products.Find(p => p.ProductId == orderItem.ProductId);
                if (product == null)
                    throw new Exception("Some of the products are not found in DB!");
                if (product.Amount < orderItem.Quantity)
                    isEnoughQuantity = false;

                OrderProduct prod = new OrderProduct();
                prod.Product= product;
                prod.Order = order;
                prod.OrderId = orderItem.OrderId;
                prod.ProductId=product.ProductId;
                prod.Quantity = orderItem.Quantity;

                order.OrderItems.Add(prod);
            }

            if(!isEnoughQuantity)
                throw new Exception("There are not enough quantities for some products!");

            int delivery = 0;
            float itemSum = 0;

            foreach (var orderItem in newOrder.OrderItems)
            {
                //maybe use a list with only the products needed
                var product = products.Find(p => p.ProductId == orderItem.ProductId);
                var seller = users.Find(u => u.UserId == product.UserId);

                delivery += seller.DeliveryCost;
                product.Amount -= orderItem.Quantity;
                itemSum += orderItem.Quantity*product.Price;

                await _productRepository.UpdateProduct(product);
            }

            order.TotalCost = itemSum + delivery;

            try
            {
                _orderRepository.AddOrder(order);
            } catch (Exception ex) { throw ex; }

            return true;
        }
    }
}
