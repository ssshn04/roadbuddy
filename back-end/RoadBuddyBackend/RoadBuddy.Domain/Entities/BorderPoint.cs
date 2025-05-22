using RoadBuddy.Domain.Common;

namespace RoadBuddy.Domain.Entities;

public class BorderPoint : BaseEntity
{
    public string Name { get; set; } = default!;
    public string Location { get; set; } = default!;
    public int Load { get; set; } // поточна кількість в черзі

    public ICollection<QueueEntry> QueueEntries { get; set; } = new List<QueueEntry>();
}
