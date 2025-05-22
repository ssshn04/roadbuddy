using MediatR;
using RoadBuddy.Application.DTOs.VehicleDTOs;

namespace RoadBuddy.Application.Commands.Vehicles.Create
{

    public class CreateVehicleCommand : IRequest<VehicleDto>
    {
        public string PlateNumber { get; set; } = default!;
        public string Model { get; set; } = default!;
        public string Brand { get; set; } = default!;
        public int Year { get; set; }
        public Guid UserId { get; set; }
    }

}
