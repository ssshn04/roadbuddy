using RoadBuddy.Domain.Common;

namespace RoadBuddy.Domain.Entities;

public class QueueEntry : BaseEntity
{
    public Guid UserId { get; set; }
    public User User { get; set; } = default!;

    public Guid BorderPointId { get; set; }
    public BorderPoint BorderPoint { get; set; } = default!;

    public DateTime EnqueuedAt { get; set; } = DateTime.UtcNow;
    public int Position { get; set; }
    public TimeSpan EstimatedWaitTime { get; set; }
}
