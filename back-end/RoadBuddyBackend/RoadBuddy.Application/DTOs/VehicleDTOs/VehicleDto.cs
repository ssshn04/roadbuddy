namespace RoadBuddy.Application.DTOs.VehicleDTOs
{
    public class VehicleDto
    {
        public Guid Id { get; set; }
        public string PlateNumber { get; set; } = default!;
        public string Model { get; set; } = default!;
        public string Brand { get; set; } = default!;
        public int Year { get; set; }
    }

}
