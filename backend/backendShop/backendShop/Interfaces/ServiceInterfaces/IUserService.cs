using backendShop.DTO;
using backendShop.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backendShop.Interfaces.ServiceInterfaces
{
    public interface IUserService
    {
        Task<UserDTO> RegisterUser(RegistrationDataDTO regdata);
        Task<string> LoginUser(LoginDataDTO regdata);
        Task<UserDTO> GetUserById(int id);
        Task<UserDTO> EditUser(int id,UserDTO updateData);
        Task<List<SellerDTO>> GetAllSellers();
        Task<List<SellerDTO>> SellerService(string sellerEmail, SellerApprovalActions action);
        Task<UserDTO> UploadImageToProfile(int userId,PhotoUploadDTO photo );
    }
}
