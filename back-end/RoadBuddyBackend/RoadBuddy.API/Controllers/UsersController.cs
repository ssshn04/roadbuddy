using MediatR;
using Microsoft.AspNetCore.Mvc;
using RoadBuddy.Application.Queries.Users.Get;


namespace RoadBuddy.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IMediator _mediator;

        public UsersController(IMediator mediator)
        {
            _mediator = mediator;
        }

        // GET api/users/id/{username}
        [HttpGet("id/{userName}")]
        public async Task<IActionResult> GetUserIdByUserName(string userName)
        {
            var userId = await _mediator.Send(new GetUserIdByUserNameQuery(userName));

            if (userId == null)
                return NotFound();

            return Ok(userId);
        }
    }
}
