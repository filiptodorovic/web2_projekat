using backendShop.Data;
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
        private readonly DataContext _context;

        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {
            var rng = new Random();

            Models.User u = new Models.User();
            u.Email = "nekiemail2@gmail.com";
            u.Username = "username2";
            u.Password = "password1";
            u.Name = "Name1";
            u.LastName = "LastName1";
            u.DateOfBith = DateTime.Now;
            u.Address = "Address1";
            u.UserType = Models.UserType.BUYER;
            u.PictureUrl = "SomeUrl.com";

            _context.Users.Add(u);
            _context.SaveChanges();

            var user = _context.Users.Find("nekiemail@gmail.com");

            if (((Models.User)user).Buyer != null) {
                if (2 > 1) { 
                
                }
            }


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
