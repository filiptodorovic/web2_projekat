using backendShop.DTO;
using backendShop.Interfaces.ServiceInterfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System;
using backendShop.Services;

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
        //add roles
        public async Task<IActionResult> Checkout([FromBody] ProductDTO product)
        {
            //List<ProductDTO> products = null;
            //try
            //{
            //    int userId = Int32.Parse(User.Claims.First(c => c.Type == "UserId").Value);
            //    products = await _productService.AddProduct(userId, product);

            //}
            //catch (Exception ex)
            //{
            //    return BadRequest(new { Message = ex.Message });

            //}

            //if (products == null)
            //    return BadRequest(new { Message = "No products in the DB!" });
            //return Ok(products);
            return Ok();
        }
    }


}
