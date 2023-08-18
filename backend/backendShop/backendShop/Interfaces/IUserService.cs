using backendShop.DTO;
using backendShop.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backendShop.Interfaces
{
    public interface IUserService
    {
        Task<UserDTO> RegisterUser(RegistrationDataDTO regdata);
        Task<string> LoginUser(LoginDataDTO regdata);
        Task<UserDTO> GetUserById(int id);
        Task<List<SellerDTO>> GetAllSellers();
        Task<List<SellerDTO>> SellerService(string sellerEmail,SellerApprovalActions action);
    }
}
