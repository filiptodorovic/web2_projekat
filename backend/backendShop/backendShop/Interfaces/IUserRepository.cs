using backendShop.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backendShop.Interfaces
{
    public interface IUserRepository
    {
        Task<User> Register(User u);
        Task<List<User>> GetAllUsers();
        Task<bool> UpdateUser(User u);
    }
}
