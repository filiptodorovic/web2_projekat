using backendShop.DTO;
using backendShop.Interfaces.ServiceInterfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System;
using backendShop.Services;
using backendShop.Models;

namespace backendShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : Controller
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpPost("checkout")]
        [Authorize(Roles = "BUYER")]
        public async Task<IActionResult> Checkout([FromBody] OrderDTO order)
        {
            try
            {
                int userId = Int32.Parse(User.Claims.First(c => c.Type == "UserId").Value);
                await _orderService.CreateOrder(userId, order);

            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });

            }

            return Ok();
        }

        [HttpGet("get-all-orders")]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> GetAllOrders()
        {
            List<OrderDTO> orders = null;
            try
            {
                orders =await _orderService.GetAllOrders();

            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }

            if (orders == null)
                return BadRequest(new { Message = "No products in the DB!" });
            return Ok(orders);
        }

        [HttpGet("get-all-user-orders")]
        [Authorize(Roles = "BUYER")]
        public async Task<IActionResult> GetAllUserOrders()
        {
            List<OrderDTO> orders = null;
            try
            {
                int userId = Int32.Parse(User.Claims.First(c => c.Type == "UserId").Value);
                orders = await _orderService.GetAllUserOrders(userId);

            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }

            if (orders == null)
                return BadRequest(new { Message = "No products in the DB!" });
            return Ok(orders);
        }

        [HttpPost("cancel-order")]
        [Authorize(Roles = "BUYER")]
        public async Task<IActionResult> CancelOrder([FromBody] OrderDTO order)
        {
            List<OrderDTO> orders = null;
            try
            {
                int userId = Int32.Parse(User.Claims.First(c => c.Type == "UserId").Value);
                orders = await _orderService.CancelOrder(userId, order.OrderId);

            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }

            if (orders == null)
                return BadRequest(new { Message = "No products in the DB!" });
            return Ok(orders);
        }

        [HttpGet("get-all-seller-new-orders")]
        [Authorize(Roles = "SELLER")]
        public async Task<IActionResult> GetSellerNewOrders()
        {
            List<OrderDTO> orders = null;
            try
            {
                int userId = Int32.Parse(User.Claims.First(c => c.Type == "UserId").Value);
                orders = await _orderService.GetSellerNewOrders(userId);

            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }

            if (orders == null)
                return BadRequest(new { Message = "No products in the DB!" });
            return Ok(orders);
        }

        [HttpGet("get-all-seller-old-orders")]
        [Authorize(Roles = "SELLER")]
        public async Task<IActionResult> GetSellerOldOrders()
        {
            List<OrderDTO> orders = null;
            try
            {
                int userId = Int32.Parse(User.Claims.First(c => c.Type == "UserId").Value);
                orders = await _orderService.GetSellerOldOrders(userId);

            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }

            if (orders == null)
                return BadRequest(new { Message = "No products in the DB!" });
            return Ok(orders);
        }
    }


}
