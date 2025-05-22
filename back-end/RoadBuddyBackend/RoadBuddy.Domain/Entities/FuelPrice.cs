using RoadBuddy.Domain.Common;
using RoadBuddy.Domain.Enums;

namespace RoadBuddy.Domain.Entities;

public class FuelPrice : BaseEntity
{
    public FuelType FuelType { get; set; }
    public decimal PricePerLiter { get; set; }

    public Guid FuelStationId { get; set; }
    public FuelStation FuelStation { get; set; } = default!;
}
