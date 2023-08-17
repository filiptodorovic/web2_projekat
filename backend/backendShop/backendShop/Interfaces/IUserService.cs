using backendShop.DTO;
using backendShop.Models;
using System.Threading.Tasks;

namespace backendShop.Interfaces
{
    public interface IUserService
    {
        Task<UserDTO> RegisterUser(RegistrationDataDTO regdata);
        Task<string> LoginUser(LoginDataDTO regdata);
        Task<UserDTO> GetUserById(int id);
    }
}
