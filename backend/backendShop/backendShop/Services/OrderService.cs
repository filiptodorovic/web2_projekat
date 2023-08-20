using AutoMapper;
using backendShop.Interfaces.RepositoryInterfaces;
using backendShop.Interfaces.ServiceInterfaces;
using Microsoft.Extensions.Configuration;

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

    }
}
