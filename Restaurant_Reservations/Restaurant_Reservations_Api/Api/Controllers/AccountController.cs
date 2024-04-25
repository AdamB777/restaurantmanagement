using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    public class AccountController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
