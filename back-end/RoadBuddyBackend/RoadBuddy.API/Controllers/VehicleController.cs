using Microsoft.AspNetCore.Mvc;
using RoadBuddy.Application.DTOs;
using RoadBuddy.Application.DTOs.VehicleDTOs;
using RoadBuddy.Application.Interfaces;
using RoadBuddy.Domain.Entities;

namespace RoadBuddy.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VehicleController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public VehicleController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpPost]
        public async Task<IActionResult> CreateVehicle([FromBody] CreateVehicleDto dto, CancellationToken cancellationToken)
        {
            var vehicle = new Vehicle
            {
                PlateNumber = dto.PlateNumber,
                Brand = dto.Brand,
                Model = dto.Model,
                Year = dto.Year,
                UserId = dto.UserId
            };

            await _unitOfWork.VehicleRepository.AddAsync(vehicle, cancellationToken);
            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return CreatedAtAction(nameof(GetVehicleById), new { id = vehicle.Id }, vehicle);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetVehicleById(Guid id, CancellationToken cancellationToken)
        {
            var vehicle = await _unitOfWork.VehicleRepository.GetByIdAsync(id, cancellationToken);

            if (vehicle == null)
                return NotFound();

            return Ok(vehicle);
        }
    }
}
