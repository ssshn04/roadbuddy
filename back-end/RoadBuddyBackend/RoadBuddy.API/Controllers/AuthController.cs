using MediatR;
using Microsoft.AspNetCore.Mvc;
using RoadBuddy.Application.Commands.Login;
using RoadBuddy.Application.Commands.Register;
using RoadBuddy.Application.DTOs;

namespace RoadBuddy.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IMediator _mediator;

        public AuthController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterUserDto dto)
        {
            try
            {
                var command = new RegisterUserCommand { UserDto = dto };
                var token = await _mediator.Send(command);
                return Ok(new { Token = token });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Error = ex.Message });
            }
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginUserDto loginDto)
        {
            try
            {
                var token = await _mediator.Send(new LoginUserCommand(loginDto.UserName, loginDto.Password));
                return Ok(new { Token = token });
            }
            catch (System.Exception ex)
            {
                return Unauthorized(new { Message = ex.Message });
            }
        }

    }
}
