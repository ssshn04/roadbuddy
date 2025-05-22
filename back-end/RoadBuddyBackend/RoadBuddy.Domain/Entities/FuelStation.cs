using RoadBuddy.Domain.Common;

namespace RoadBuddy.Domain.Entities;

public class FuelStation : BaseEntity
{
    public string Name { get; set; } = default!;
    public string Location { get; set; } = default!;

    public ICollection<FuelPrice> Prices { get; set; } = new List<FuelPrice>();
    public ICollection<Review> Reviews { get; set; } = new List<Review>();
}
