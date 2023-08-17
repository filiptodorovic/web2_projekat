using backendShop.DTO;
using backendShop.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
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
            UserDTO writtenUser=null;
            try
            {
                writtenUser = await _userService.RegisterUser(registerData);
            }
            catch (Exception ex) {
                return BadRequest(new { Message = ex.Message });
            }
            if (writtenUser == null)
                return BadRequest();
            return Ok(writtenUser);
        }

        [HttpPost("log-in")]
        [AllowAnonymous]
        public async Task<IActionResult> LogIn([FromBody] LoginDataDTO loginData)
        {
            string token = String.Empty;
            try
            {
                token = await _userService.LoginUser(loginData);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
            if (token == String.Empty)
                return BadRequest();
            return Ok(token);
        }

        [HttpGet("profile")]
        [Authorize]
        public async Task<IActionResult> GetMyProfile() {
            int userId = Int32.Parse(User.Claims.First(c => c.Type == "UserId").Value);

            UserDTO user = null;

            try
            {
                user = await _userService.GetUserById(userId);
            } 
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }

            if (user==null)
                return BadRequest();
            return Ok(user);
        }
    }
}
