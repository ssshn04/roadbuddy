using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MediatR;
using RoadBuddy.Application.Queries.UserProfile.Get;
using RoadBuddy.Application.DTOs;
using System.Security.Claims;

namespace RoadBuddy.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    //[Authorize]  
    public class ProfileController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ProfileController(IMediator mediator)
        {
            _mediator = mediator;
        }

        /*[HttpGet("me")]
        public async Task<ActionResult<UserProfileDto>> GetMyProfile()
        {            
            var userName = User.FindFirstValue(ClaimTypes.Name);
            if (string.IsNullOrEmpty(userName))
                return Unauthorized();

            var query = new GetUserProfileQuery(userName);
            var profile = await _mediator.Send(query);

            if (profile == null)
                return NotFound();

            return Ok(profile);
        }*/

        [HttpGet("{username}")]        
        public async Task<ActionResult<UserProfileDto>> GetProfileByUsername(string username)
        {
            if (string.IsNullOrEmpty(username))
                return BadRequest("Username must be provided");

            var query = new GetUserProfileQuery(username);
            var profile = await _mediator.Send(query);

            if (profile == null)
                return NotFound();

            return Ok(profile);
        }

    }
}
