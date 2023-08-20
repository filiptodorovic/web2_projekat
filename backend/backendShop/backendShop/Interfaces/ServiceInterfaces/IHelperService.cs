using System.Text;
using System.Threading.Tasks;

namespace backendShop.Interfaces.ServiceInterfaces
{
    public interface IHelperService
    {
        public Task<string> GetSavedImagePath(byte[] image);
        public Task<string> ComputeSha256Hash(string rawData);
        public void SendEmail(string recepient, string message);
    }
}
