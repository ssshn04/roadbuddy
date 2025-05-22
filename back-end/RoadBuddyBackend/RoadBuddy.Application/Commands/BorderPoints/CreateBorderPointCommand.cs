using MediatR;
using RoadBuddy.Application.DTOs.BorderPoint;

namespace RoadBuddy.Application.Commands.BorderPoints
{
    public class CreateBorderPointCommand : IRequest<Guid>
    {
        public CreateBorderPointDto Dto { get; set; } = default!;
    }
}
