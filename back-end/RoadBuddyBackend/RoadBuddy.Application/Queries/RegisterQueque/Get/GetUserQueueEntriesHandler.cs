using MediatR;
using RoadBuddy.Application.DTOs.QueueRegister;
using RoadBuddy.Application.Interfaces;

namespace RoadBuddy.Application.Queries.RegisterQueque.Get
{
    public class GetUserQueueEntriesHandler : IRequestHandler<GetUserQueueEntriesQuery, List<UserQueueEntryDto>>
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetUserQueueEntriesHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<List<UserQueueEntryDto>> Handle(GetUserQueueEntriesQuery request, CancellationToken cancellationToken)
        {
            var entries = await _unitOfWork.QueueEntryRepository.GetByUserIdAsync(request.UserId);

            return entries.Select(e => new UserQueueEntryDto
            {
                BorderPointName = e.BorderPoint.Name,
                EnqueuedAt = e.EnqueuedAt,
                Position = e.Position,
                EstimatedWaitTime = e.EstimatedWaitTime
            }).ToList();
        }
    }
}
