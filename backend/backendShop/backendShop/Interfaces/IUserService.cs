using backendShop.DTO;

namespace backendShop.Interfaces
{
    public interface IUserService
    {
        public bool RegisterUser(RegistrationDataDTO regdata);
    }
}
