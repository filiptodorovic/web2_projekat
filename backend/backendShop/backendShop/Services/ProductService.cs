using AutoMapper;
using backendShop.DTO;
using backendShop.Interfaces.RepositoryInterfaces;
using backendShop.Interfaces.ServiceInterfaces;
using backendShop.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace backendShop.Services
{
    public class ProductService : IProductService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        private readonly IProductRepository _productRepository;
        public ProductService(IProductRepository productRepository,IUserRepository userRepo, IMapper mapper, IConfiguration configuration)
        {
            _userRepository = userRepo;
            _mapper = mapper;
            _configuration = configuration;
            _productRepository= productRepository;
        }
        public async Task<List<ProductDTO>> AddProduct(int sellerId, ProductDTO newProduct)
        {
            if (string.IsNullOrEmpty(newProduct.Name) || string.IsNullOrEmpty(newProduct.Description)
                || string.IsNullOrEmpty(newProduct.Amount.ToString()) || string.IsNullOrEmpty(newProduct.Price.ToString()))
                throw new Exception("Fields cannot be empty!");

            if (newProduct.Amount < 0)
                throw new Exception("Quantity cannot be less than 0!");

            if (newProduct.Price < 0)
                throw new Exception("Price cannot be less than 0!");

            List<User>? users = await _userRepository.GetAllUsers();

            User foundSeller = users.Find(u => u.UserId == sellerId);

            if (foundSeller == null)
                throw new Exception("Seller not found in the DB!");

            Product prod = _mapper.Map<ProductDTO, Product>(newProduct);

            //using (var memoryStream = new MemoryStream())
            //{
            //    newProduct.Picture.CopyTo(memoryStream, 0);
            //    var imageBytes = memoryStream.ToArray();
            //    prod.Picture = imageBytes;

            //}

            //string extension = ".jpg";
            //string fileName = Path.ChangeExtension(
            //    Path.GetRandomFileName(),
            //    extension
            //);

            prod.isDeleted = false;
            prod.UserId = sellerId;
            prod.User = foundSeller;

            try
            {
                await _productRepository.AddProduct(prod);
            }
            catch (Exception ex) { throw ex; }

            try
            {
                return await this.GetAllSellerProducts(sellerId);
            }
            catch (Exception ex) { throw ex; }

        }

        public async Task<List<ProductDTO>> GetAllSellerProducts(int sellerId)
        {
            List<User>? users = await _userRepository.GetAllUsers();

            User foundSeller = users.Find(u => u.UserId == sellerId);

            if (foundSeller == null)
                throw new Exception("Seller not found in the DB!");

            try
            {
                List<Product> prods = await _productRepository.GetAllProducts();
                prods = prods.FindAll(p => (p.UserId == sellerId && !p.isDeleted));
                return _mapper.Map<List<Product>, List<ProductDTO>>(prods);
                
            }
            catch (Exception ex) { throw ex; }


        }

        public async Task<List<ProductDTO>> RemoveProduct(int sellerId, ProductDTO productToRemove)
        {
            if (string.IsNullOrEmpty(productToRemove.ProductId.ToString()) )
                throw new Exception("Product ID cannot be empty!");


            List<User>? users = await _userRepository.GetAllUsers();

            User foundSeller = users.Find(u => u.UserId == sellerId);

            if (foundSeller == null)
                throw new Exception("Seller not found in the DB!");


            List<Product> allProducts = await _productRepository.GetAllProducts();

            Product deletedProduct = allProducts.Find(p => p.ProductId == productToRemove.ProductId);
            if(deletedProduct==null)
                throw new Exception("Product not found in the DB!");

            deletedProduct.isDeleted = true;

            try
            {
                await _productRepository.UpdateProduct(deletedProduct);
            }catch(Exception ex) { throw ex; }

            try
            {
                return await this.GetAllSellerProducts(sellerId);
            }
            catch (Exception ex) { throw ex; }

        }


    }
}
