using MediatR;
using RoadBuddy.Application.DTOs.QueueRegister;

namespace RoadBuddy.Application.Queries.RegisterQueque.Get
{
    public class GetUserQueueEntriesQuery : IRequest<List<UserQueueEntryDto>>
    {
        public Guid UserId { get; set; }
    }
}
