using backendShop.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backendShop.Interfaces.RepositoryInterfaces
{
    public interface IUserRepository
    {
        Task<User> AddUser(User u);
        Task<List<User>> GetAllUsers();
        Task<bool> UpdateUser(User u);
    }
}
