using AutoMapper;
using backendShop.DTO;
using backendShop.Models;

namespace backendShop.Mapping
{
    public class MappingProfile:Profile
    {
        public MappingProfile() {
            CreateMap<User, UserDTO>().ReverseMap();
            CreateMap<Product, ProductDTO>().ReverseMap();
        } 
    }
}
