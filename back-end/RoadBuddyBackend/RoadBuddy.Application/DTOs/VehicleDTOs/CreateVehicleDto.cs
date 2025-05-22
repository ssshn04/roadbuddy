using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RoadBuddy.Application.DTOs.VehicleDTOs
{
    public class CreateVehicleDto
    {
        public string PlateNumber { get; set; } = default!;
        public string Model { get; set; } = default!;
        public string Brand { get; set; } = default!;
        public int Year { get; set; }
        public Guid UserId { get; set; } 
    }

}
