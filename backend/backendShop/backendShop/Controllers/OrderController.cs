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
        [Authorize]
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
        [Authorize]
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
    }


}
