using Application.CQRS.Customers;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using ModelsDB;
using RestaurantDB;

namespace Api.Controllers
{
    public class TestController : BaseApiController
    {
        public TestController(IMediator mediator, RestaurantContext context) : base(mediator, context)
        {
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetStates()
        {
            var result = 
                
                from state in _context.CountryStatesDB
                select state;

            return Ok(result);
        }
    }
}
