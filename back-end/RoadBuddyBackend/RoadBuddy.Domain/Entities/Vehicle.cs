using RoadBuddy.Domain.Common;

namespace RoadBuddy.Domain.Entities
{

    public class Vehicle : BaseEntity
    {
        public string PlateNumber { get; set; } = default!;
        public string Model { get; set; } = default!;
        public string Brand { get; set; } = null!;
        public int Year { get; set; }

        public Guid UserId { get; set; }
        public User User { get; set; } = default!;
    }
}