using System.IO;
using System;
using AutoMapper;
using backendShop.Interfaces.RepositoryInterfaces;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using System.Net.Mail;
using System.Net;
using System.Text;
using System.Security.Cryptography;
using backendShop.Interfaces.ServiceInterfaces;

namespace backendShop.Services
{
    public class HelperService : IHelperService
    {
        private readonly IConfiguration _configuration;
        public HelperService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<string> GetSavedImagePath(byte[] image)
        {
            string extension = ".jpg";
            string fileName = Path.ChangeExtension(
                Path.GetRandomFileName(),
                extension
            );

            string path = String.Format("{0}{1}", _configuration["ImageStoragePath"], fileName);

            using (var ms = new MemoryStream(image))
            {
                using (var fs = new FileStream(path, FileMode.Create))
                {
                    ms.WriteTo(fs);
                }
            }

            return String.Format("{0}{1}", _configuration["ImageAccessPath"], fileName);
        }

        public async Task<string> ComputeSha256Hash(string rawData)
        {
            // Create a SHA256
            using (SHA256 sha256Hash = SHA256.Create())
            {
                // ComputeHash - returns byte array
                byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(rawData));

                // Convert byte array to a string
                StringBuilder builder = new StringBuilder();
                for (int i = 0; i < bytes.Length; i++)
                {
                    builder.Append(bytes[i].ToString("x2"));
                }
                return builder.ToString();
            }
        }

        public void SendEmail(string recepient, string message)
        {
            string sender = _configuration["EmailService:SenderEmail"];
            var smtpClient = new SmtpClient(_configuration["EmailService:SMTPClient"])
            {
                Port = 587,
                Credentials = new NetworkCredential(sender, _configuration["EmailService:SenderPass"]),
                EnableSsl = true,
            };

            smtpClient.Send(sender, recepient, "[Web2Store] Verification status", message);

        }
    }
}
