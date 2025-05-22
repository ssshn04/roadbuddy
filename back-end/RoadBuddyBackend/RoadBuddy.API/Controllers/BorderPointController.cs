
// < ---------------------- Для прикордонників ---------------------- > 

using MediatR;
using Microsoft.AspNetCore.Mvc;
using RoadBuddy.Application.Commands.BorderPoints;
using RoadBuddy.Application.DTOs.BorderPoint;

namespace RoadBuddy.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BorderPointController : ControllerBase
    {
        private readonly IMediator _mediator;

        public BorderPointController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateBorderPointDto dto)
        {
            var id = await _mediator.Send(new CreateBorderPointCommand { Dto = dto });
            return Ok(new { id });
        }
    }
}
