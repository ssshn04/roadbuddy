using MediatR;
using RoadBuddy.Application.DTOs.QueueRegister;
using RoadBuddy.Application.Interfaces;
using RoadBuddy.Domain.Entities;

namespace RoadBuddy.Application.Commands.RegisterQueque.Create
{
    public class RegisterQueueCommandHandler : IRequestHandler<RegisterQueueCommand, QueueRegistrationResultDto>
    {
        private readonly IUnitOfWork _unitOfWork;

        public RegisterQueueCommandHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<QueueRegistrationResultDto> Handle(RegisterQueueCommand request, CancellationToken cancellationToken)
        {
            // 1. Отримуємо позицію в черзі
            var nextPosition = await _unitOfWork.QueueEntryRepository.GetNextPositionAsync(request.BorderPointId);

            // 2. Створюємо новий запис у черзі
            var queueEntry = new QueueEntry
            {
                UserId = request.UserId,
                BorderPointId = request.BorderPointId,
                EnqueuedAt = DateTime.UtcNow,
                Position = nextPosition,
                EstimatedWaitTime = TimeSpan.FromMinutes(5 * nextPosition) 
            };

            await _unitOfWork.QueueEntryRepository.AddAsync(queueEntry);

            // 3. Збільшуємо Load у BorderPoint
            var borderPoint = await _unitOfWork
                .BorderPointRepository 
                .GetByIdAsync(request.BorderPointId);

            if (borderPoint == null)
                throw new Exception("BorderPoint not found");

            borderPoint.Load += 1;

            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return new QueueRegistrationResultDto
            {
                BorderPointName = borderPoint.Name,
                Position = queueEntry.Position,
                EnqueuedAt = queueEntry.EnqueuedAt,
                EstimatedWaitTime = queueEntry.EstimatedWaitTime
            };
        }
    }
}
