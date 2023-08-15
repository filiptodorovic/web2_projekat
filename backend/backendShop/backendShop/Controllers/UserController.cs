using backendShop.DTO;
using backendShop.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

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
        public async Task<IActionResult> Register([FromBody] RegistrationDataDTO registerData)
        {
            UserDTO writtenUser = await _userService.RegisterUser(registerData);

            if (writtenUser == null)
                return BadRequest();
            return Ok(writtenUser);
        }
    }
}
