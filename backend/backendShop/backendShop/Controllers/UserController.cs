using backendShop.DTO;
using backendShop.Interfaces.ServiceInterfaces;
using backendShop.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
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

        [HttpPost("google-register")]
        [AllowAnonymous]
        public async Task<IActionResult> GoogleRegister([FromBody] RegistrationDataDTO registerData)
        {
            UserDTO writtenUser = null;
            try
            {
                writtenUser = await _userService.GoogleRegisterUser(registerData);
            }
            catch (Exception ex)
            {
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

        [HttpPost("google-log-in")]
        [AllowAnonymous]
        public async Task<IActionResult> GoogleLogIn([FromBody] GoogleTokenDTO googleToken)
        {
            string token = String.Empty;
            try
            {
                token = await _userService.GoogleLoginUser(googleToken.accessToken);
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

        [HttpGet("get-all-sellers")]
        [Authorize(Roles = "ADMIN")]
        //add roles
        public async Task<IActionResult> GetAllSellers()
        {
            List<SellerDTO> sellers = await _userService.GetAllSellers();
            
            if (sellers == null)
                return BadRequest(new { Message = "No sellers in the DB!" });
            return Ok(sellers);
        }

        [HttpPost("approve-seller")]
        [Authorize(Roles = "ADMIN")]
        //add roles
        public async Task<IActionResult> ApproveSeller([FromBody] SellerDTO sellerData)
        {
            List<SellerDTO> sellers = null;
            try
            {

                sellers = await _userService.SellerService(sellerData.Email, SellerApprovalActions.APPROVE);

            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });

            }

            if (sellers == null)
                return BadRequest(new { Message = "No sellers in the DB!" });
            return Ok(sellers);
        }

        [HttpPost("deny-seller")]
        [Authorize(Roles = "ADMIN")]
        //add roles
        public async Task<IActionResult> DenySeller([FromBody] SellerDTO sellerData)
        {
            List<SellerDTO> sellers = null;
            try
            {

                sellers = await _userService.SellerService(sellerData.Email, SellerApprovalActions.DENY);

            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });

            }

            if (sellers == null)
                return BadRequest(new { Message = "No sellers in the DB!" });
            return Ok(sellers);
        }

        [HttpPost("upload-profile-picture")]
        [Authorize]
        public async Task<IActionResult> UploadProfilePicture([FromBody] PhotoUploadDTO picture)
        {
            if (picture == null || picture.Picture==null)
            {
                return BadRequest(new { Message = "No picture provided" });
            }

            UserDTO user = null;


            try
            {
                int userId = Int32.Parse(User.Claims.First(c => c.Type == "UserId").Value);

                user = await _userService.UploadImageToProfile(userId,picture);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }

            if (user == null)
                return BadRequest();
            return Ok(user);
        }

        [HttpPost("update-profile")]
        [Authorize]
        public async Task<IActionResult> EditUser([FromBody] UserDTO userData)
        {
            UserDTO writtenUser = null;
            try
            {
                int userId = Int32.Parse(User.Claims.First(c => c.Type == "UserId").Value);
                writtenUser = await _userService.EditUser(userId,userData);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
            if (writtenUser == null)
                return BadRequest();
            return Ok(writtenUser);
        }


    }
}
