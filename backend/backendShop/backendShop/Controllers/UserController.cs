using Microsoft.AspNetCore.Mvc;

namespace backendShop.Controllers
{
    public class UserController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
