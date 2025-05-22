using RoadBuddy.Domain.Common;

namespace RoadBuddy.Domain.Entities;

public class Review : BaseEntity
{
    public string Text { get; set; } = default!;
    public int Rating { get; set; } // 1-5

    public Guid UserId { get; set; }
    public User User { get; set; } = default!;

    public Guid FuelStationId { get; set; }
    public FuelStation FuelStation { get; set; } = default!;
}
