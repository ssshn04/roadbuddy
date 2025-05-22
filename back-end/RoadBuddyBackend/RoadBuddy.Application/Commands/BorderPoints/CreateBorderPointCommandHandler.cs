using MediatR;
using RoadBuddy.Application.Interfaces;
using RoadBuddy.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RoadBuddy.Application.Commands.BorderPoints
{
    public class CreateBorderPointCommandHandler : IRequestHandler<CreateBorderPointCommand, Guid>
    {
        private readonly IUnitOfWork _unitOfWork;

        public CreateBorderPointCommandHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Guid> Handle(CreateBorderPointCommand request, CancellationToken cancellationToken)
        {
            var entity = new BorderPoint
            {
                Id = Guid.NewGuid(),
                Name = request.Dto.Name,
                Location = request.Dto.Location,
                Load = 0
            };

            await _unitOfWork.BorderPointRepository.AddAsync(entity);
            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return entity.Id;
        }
    }
}
