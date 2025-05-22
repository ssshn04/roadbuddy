using MediatR;
using RoadBuddy.Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RoadBuddy.Application.Commands.RegisterQueque.Delete
{
    public class DeleteQueueEntryHandler : IRequestHandler<DeleteQueueEntryCommand, bool>
    {
        private readonly IUnitOfWork _unitOfWork;

        public DeleteQueueEntryHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<bool> Handle(DeleteQueueEntryCommand request, CancellationToken cancellationToken)
        {
            var entry = await _unitOfWork.QueueEntryRepository.GetByIdAsync(request.QueueEntryId);
            if (entry == null || entry.UserId != request.UserId)
                return false;

            var borderPoint = await _unitOfWork.BorderPointRepository.GetByIdAsync(entry.BorderPointId);
            if (borderPoint != null && borderPoint.Load > 0)
                borderPoint.Load--;

            _unitOfWork.QueueEntryRepository.Delete(entry);
            await _unitOfWork.SaveChangesAsync();

            return true;
        }
    }
}
