using Application.CQRS.Customers;
using Application.DTOs.LoginsDTO;
using Application.DTOs.UsersDTO;
using Application.Services;
using MediatR;
using Microsoft.AspNetCore.Authorization;
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

        [Authorize(Roles = "Owner")]
        [HttpGet("all")]
        public async Task<IActionResult> GetCustomers()
        {
            var result = await _mediator.Send(new CustomerList.Query());
            return HandleResult(result);
        }

        /// <summary>
        /// Metoda do logowania użytkowników
        /// </summary>
        /// <param name="loginDTO">Obiekt z danymi logowania</param>
        /// <returns>Zwraca dane użytkownika i token JWT, jeśli operacja się powiedzie lub komunikat o błędzie w wyniku niepowodzenia</returns>
        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDTO)
        {
            var user = await _userManager.FindByEmailAsync(loginDTO.Email);
            if (user == null || !await _userManager.CheckPasswordAsync(user, loginDTO.Password))
                return Unauthorized("user jest null lub hasło się nie zgadza");

            if (!user.EmailConfirmed)
                return Unauthorized("Email nie został potwierdzony.");

            var token = await _tokenService.GenerateToken(user);
            Console.WriteLine("Token from api is: ", token.ToString());


            return new UserDTO
            {
                Id = user.Id,
                Email = user.Email,
                Token = token,
            };
        }

        [Authorize]
        [HttpGet("currentUser")]
        public async Task<ActionResult<UserDTO>> GetCurrentUser()
        {
            var userName = User.Identity.Name;

            var user = await _userManager.FindByNameAsync(userName);
            if (user == null)
            {
                return NotFound("Użytkownik nie znaleziony.");
            }

            return new UserDTO
            {
                Id = user.Id,
                Email = user.Email,
                Token = await _tokenService.GenerateToken(user),
            };
        }
    }
}
