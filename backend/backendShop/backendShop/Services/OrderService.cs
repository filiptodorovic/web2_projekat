using AutoMapper;
using backendShop.DTO;
using backendShop.Interfaces.RepositoryInterfaces;
using backendShop.Interfaces.ServiceInterfaces;
using backendShop.Models;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using System.Linq;

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

        public async Task<List<OrderDTO>> CancelOrder(int userId, int orderId)
        {
            List<User>? users = await _userRepository.GetAllUsers();

            User foundBuyer = users.Find(u => u.UserId == userId);

            if (foundBuyer == null)
                throw new Exception("Buyer not found in the DB!");

            List<Order> orders = await _orderRepository.GetAllOrders();

            var order = orders.Find(o => (o.OrderId == orderId && o.UserId == userId));

            if(order==null)
                throw new Exception("Order not found in the DB!");

            DateTime orderTime = order.TimeOrdered;
            DateTime currentTime = DateTime.Now;
            TimeSpan timeDifference = currentTime - orderTime;

            if (timeDifference.TotalHours >= 1)
                throw new Exception("Order already delivered!");

            if (order.IsCancelled)
                throw new Exception("Order already cancelled!");

            order.IsCancelled = true;

            await _orderRepository.UpdateOrder(order);


            List<OrderProduct> orderProducts = await _orderRepository.GetAllOrderItems();
            List<Product> products = await _productRepository.GetAllProducts();

            orderProducts = orderProducts.FindAll(op => op.OrderId == orderId);

            foreach (var op in orderProducts) {
                op.Product.Amount++;
                await _productRepository.UpdateProduct(op.Product);
            }

            return await this.GetAllUserOrders(userId);

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

            List<Product> productQuantitytoUpdate = new List<Product>();

            foreach (var orderItem in newOrder.OrderItems)
            {
                //maybe use a list with only the products needed
                var product = products.Find(p => p.ProductId == orderItem.ProductId);
                var seller = users.Find(u => u.UserId == product.UserId);

                delivery += seller.DeliveryCost;
                product.Amount -= orderItem.Quantity;
                if(product.Amount<0)
                    throw new Exception("There are not enough quantities for some products!");
                itemSum += orderItem.Quantity*product.Price;

                productQuantitytoUpdate.Add(product);
            }

            foreach (var prod in productQuantitytoUpdate) {
                if (prod.Amount < 0)
                    throw new Exception(string.Format("No more products {0} left!",prod.Name));
            
            }

            foreach (var prod in productQuantitytoUpdate)
            {
                await _productRepository.UpdateProduct(prod);

            }

            order.TotalCost = itemSum + delivery;

            try
            {
                _orderRepository.AddOrder(order);
            } catch (Exception ex) { throw ex; }

            return true;
        }

        public async Task<List<OrderDTO>> GetAllOrders()
        {
            List<Order> orderList = null;
            try
            {
                orderList = await _orderRepository.GetAllOrders();
            }
            catch (Exception ex) { throw ex; }

            List<OrderProduct> orderItems = await _orderRepository.GetAllOrderItems();
            List<Product> products = await _productRepository.GetAllProducts();

            foreach (var order in orderList)
            {
                order.OrderItems = orderItems.FindAll(oi => oi.OrderId == order.OrderId);

                for(int i=0;i<order.OrderItems.Count;i++)
                {
                    order.OrderItems[i].Product = products.Find(p=>p.ProductId == order.OrderItems[i].ProductId);
                }
            }

            

            return _mapper.Map<List<Order>,List<OrderDTO>>(orderList);
        }

        public async Task<List<OrderDTO>> GetAllUserOrders(int userId)
        {
            List<User>? users = await _userRepository.GetAllUsers();

            User foundBuyer = users.Find(u => u.UserId == userId);

            if (foundBuyer == null)
                throw new Exception("Buyer not found in the DB!");

            List<OrderDTO> orders = await this.GetAllOrders();

            orders = orders.FindAll(o => (o.UserId == userId && !o.IsCancelled));

            return orders;
        }

        public async Task<List<OrderDTO>> GetSellerNewOrders(int userId)
        {
            List<User>? users = await _userRepository.GetAllUsers();

            User foundSeller = users.Find(u => u.UserId == userId);

            if (foundSeller == null)
                throw new Exception("Seller not found in the DB!");


            List<OrderDTO> orders = await this.GetAllOrders();
            orders = orders.FindAll(o => (!o.IsCancelled && (DateTime.Now - o.TimeOrdered).TotalHours < 1));


            // Get all Seller's products
            List<Product> prods = await _productRepository.GetAllProducts();
            prods = prods.FindAll(p => (p.UserId == userId && !p.isDeleted));

            List<int> prodIds = new List<int>();

            List<OrderDTO> retOrders = new List<OrderDTO>();

            foreach (var prod in prods) {
                prodIds.Add(prod.ProductId);
            }

            foreach (var order in orders) {
                foreach (var item in order.OrderItems) {
                    if (prodIds.Contains(item.ProductId) && !retOrders.Contains(order))
                        retOrders.Add(order);
                }
            }

            //foreach (var order in retOrders)
            //{
            //    foreach (var item in order.OrderItems)
            //    {
            //        if (!prodIds.Contains(item.ProductId))
            //            order.OrderItems.Remove(item);
            //    }
            //}

            return retOrders;
        }

        public async Task<List<OrderDTO>> GetSellerOldOrders(int userId)
        {
            List<User>? users = await _userRepository.GetAllUsers();

            User foundSeller = users.Find(u => u.UserId == userId);

            if (foundSeller == null)
                throw new Exception("Seller not found in the DB!");


            List<OrderDTO> orders = await this.GetAllOrders();
            orders = orders.FindAll(o => ((DateTime.Now - o.TimeOrdered).TotalHours >= 1));


            // Get all Seller's products
            List<Product> prods = await _productRepository.GetAllProducts();
            prods = prods.FindAll(p => (p.UserId == userId && !p.isDeleted));

            List<int> prodIds = new List<int>();

            List<OrderDTO> retOrders = new List<OrderDTO>();

            foreach (var prod in prods)
            {
                prodIds.Add(prod.ProductId);
            }

            foreach (var order in orders)
            {
                foreach (var item in order.OrderItems)
                {
                    if (prodIds.Contains(item.ProductId) && !retOrders.Contains(order))
                        retOrders.Add(order);
                }
            }

            return retOrders;
        }
    }
}
