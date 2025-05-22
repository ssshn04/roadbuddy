using MediatR;
using RoadBuddy.Application.DTOs.QueueRegister;

namespace RoadBuddy.Application.Commands.RegisterQueque.Create
{
    public class RegisterQueueCommand : IRequest<QueueRegistrationResultDto>
    {
        public Guid UserId { get; set; }
        public Guid BorderPointId { get; set; }

        public RegisterQueueCommand(Guid userId, Guid borderPointId)
        {
            UserId = userId;
            BorderPointId = borderPointId;
        }
    }
}
