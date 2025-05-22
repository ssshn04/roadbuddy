using MediatR;
using RoadBuddy.Application.DTOs.VehicleDTOs;
using RoadBuddy.Application.Interfaces;
using RoadBuddy.Domain.Entities;

namespace RoadBuddy.Application.Commands.Vehicles.Create
{

    public class CreateVehicleCommandHandler : IRequestHandler<CreateVehicleCommand, VehicleDto>
    {
        private readonly IUnitOfWork _unitOfWork;

        public CreateVehicleCommandHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<VehicleDto> Handle(CreateVehicleCommand request, CancellationToken cancellationToken)
        {
            var vehicle = new Vehicle
            {
                PlateNumber = request.PlateNumber,
                Model = request.Model,
                Brand = request.Brand,
                Year = request.Year,
                UserId = request.UserId
            };

            await _unitOfWork.VehicleRepository.AddAsync(vehicle);
            await _unitOfWork.SaveChangesAsync();

            return new VehicleDto
            {
                Id = vehicle.Id,
                PlateNumber = vehicle.PlateNumber,
                Model = vehicle.Model,
                Brand = vehicle.Brand,
                Year = vehicle.Year
            };
        }
    }

}
