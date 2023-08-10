using backendShop.Data;
using backendShop.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backendShop.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private readonly DataContext _dbContext;

        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(DataContext context)
        {
            _dbContext = context;
        }

        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {
            var rng = new Random();

                // Create and add a new Seller
                var newSeller = new Seller
                {
                    Email = "john.seller@example.com",
                    Username = "johnseller",
                    Password = "hashedpass", // You would typically hash the password
                    Name = "John",
                    LastName = "Seller",
                    DateOfBith = new DateTime(1990, 5, 15),
                    Address = "123 Main St",
                    UserType = UserType.SELLER,
                    PictureUrl = "seller.jpg",
                    ValidationState = ValidationState.PROCESSING,
                    ShippingCost = 10,
                    // Other properties specific to Seller
                };
                _dbContext.Sellers.Add(newSeller);

                // Create and add a new Buyer
                var newBuyer = new Buyer
                {
                    Email = "jane.buyer@example.com",
                    Username = "janebuyer",
                    Password = "hashedpass", // You would typically hash the password
                    Name = "Jane",
                    LastName = "Buyer",
                    DateOfBith = new DateTime(1985, 10, 20),
                    Address = "456 Park Ave",
                    UserType = UserType.BUYER,
                    PictureUrl = "buyer.jpg",
                    // Other properties specific to Buyer
                };
                _dbContext.Buyers.Add(newBuyer);

                // Create and add a new Admin
                var newAdmin = new Admin
                {
                    Email = "mike.admin@example.com",
                    Username = "mikeadmin",
                    Password = "hashedpass", // You would typically hash the password
                    Name = "Mike",
                    LastName = "Admin",
                    DateOfBith = new DateTime(1980, 3, 8),
                    Address = "789 Elm Rd",
                    UserType = UserType.ADMIN,
                    PictureUrl = "admin.jpg",
                    // Other properties specific to Admin
                };
                _dbContext.Admins.Add(newAdmin);

                // Save changes to the database
                _dbContext.SaveChanges();


            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            })
            .ToArray();
        }
    }
}
