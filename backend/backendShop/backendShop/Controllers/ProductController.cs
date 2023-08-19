using backendShop.DTO;
using backendShop.Interfaces.ServiceInterfaces;
using backendShop.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using System.Linq;

namespace backendShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : Controller
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpPost("add-product")]
        [Authorize]
        //add roles
        public async Task<IActionResult> AddProduct([FromBody] ProductDTO product)
        {
            List<ProductDTO> products = null;
            try
            {
                int userId = Int32.Parse(User.Claims.First(c => c.Type == "UserId").Value);
                products = await _productService.AddProduct(userId,product);

            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });

            }

            if (products == null)
                return BadRequest(new { Message = "No products in the DB!" });
            return Ok(products);
        }

        [HttpGet("get-all-seller-products")]
        [Authorize]
        //add roles
        public async Task<IActionResult> GetAllSellerProduct()
        {
            List<ProductDTO> products = null;
            try
            {
                int userId = Int32.Parse(User.Claims.First(c => c.Type == "UserId").Value);
                products = await _productService.GetAllSellerProducts(userId);

            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });

            }

            if (products == null)
                return BadRequest(new { Message = "No products in the DB!" });
            return Ok(products);
        }

        [HttpPost("remove-product")]
        [Authorize]
        //add roles
        public async Task<IActionResult> RemoveProduct([FromBody] ProductDTO product)
        {
            List<ProductDTO> products = null;
            try
            {
                int userId = Int32.Parse(User.Claims.First(c => c.Type == "UserId").Value);
                products = await _productService.RemoveProduct(userId, product);

            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });

            }

            if (products == null)
                return BadRequest(new { Message = "No products in the DB!" });
            return Ok(products);
        }
    }
}
