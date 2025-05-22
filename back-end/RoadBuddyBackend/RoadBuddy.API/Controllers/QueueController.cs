using MediatR;
using Microsoft.AspNetCore.Mvc;
using RoadBuddy.Application.Commands.RegisterQueque.Create;
using RoadBuddy.Application.Commands.RegisterQueque.Delete;
using RoadBuddy.Application.DTOs.QueueRegister;
using RoadBuddy.Application.Queries.RegisterQueque.Get;

[ApiController]
[Route("api/queue")]
public class QueueController : ControllerBase
{
    private readonly IMediator _mediator;

    public QueueController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterQueueDto dto)
    {
        var command = new RegisterQueueCommand(dto.UserId, dto.BorderPointId);
        var result = await _mediator.Send(command);

        return Ok(result);
    }

    [HttpGet("user/{userId}")]
    public async Task<IActionResult> GetUserQueue(Guid userId)
    {
        var result = await _mediator.Send(new GetUserQueueEntriesQuery { UserId = userId });
        return Ok(result);
    }


    [HttpDelete("{queueEntryId}/user/{userId}")]
    public async Task<IActionResult> DeleteQueueEntry(Guid queueEntryId, Guid userId)
    {
        var result = await _mediator.Send(new DeleteQueueEntryCommand
        {
            QueueEntryId = queueEntryId,
            UserId = userId
        });

        if (!result)
            return NotFound("Запис не знайдено або не належить користувачу.");

        return Ok("Запис успішно видалено.");
    }
}
