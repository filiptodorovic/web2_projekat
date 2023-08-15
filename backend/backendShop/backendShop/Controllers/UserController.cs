using backendShop.DTO;
using backendShop.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backendShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public IActionResult Register([FromBody] RegistrationDataDTO registerData)
        {
            // Call the service method
            bool success = _userService.RegisterUser(registerData);

            if (success)
            {
                return Ok(new { Message = "User registered successfully." });
            }
            else
            {
                return BadRequest(new { Message = "User registration failed." });
            }
        }
    }
}
