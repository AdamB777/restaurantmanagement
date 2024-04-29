using Application.CQRS.Customers;
using Application.Services;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ModelsDB.SystemUsers;
using RestaurantDB;

namespace Api.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<User> _userManager;
        private readonly TokenService _tokenService;

        public AccountController(UserManager<User> userManager, TokenService tokenService, IMediator mediator, RestaurantContext context) : base(mediator, context)
        {
            _userManager = userManager;
            _tokenService = tokenService;
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetCustomers()
        {
            var result = await _mediator.Send(new CustomerList.Query());
            return HandleResult(result);
        }
    }
}
