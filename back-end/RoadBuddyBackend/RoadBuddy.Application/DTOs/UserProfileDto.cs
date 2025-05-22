using RoadBuddy.Application.DTOs.VehicleDTOs;

public class UserProfileDto
{
    public string UserName { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Role { get; set; } = null!;
    public int VehiclesCount { get; set; }
    public int QueueEntriesCount { get; set; }
    public int ReviewsCount { get; set; }

    public List<VehicleDto> Vehicles { get; set; } = new();
}
