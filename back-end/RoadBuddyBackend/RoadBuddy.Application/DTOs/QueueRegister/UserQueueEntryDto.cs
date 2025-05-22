namespace RoadBuddy.Application.DTOs.QueueRegister
{
    // Для перегляду своїх черг
    public class UserQueueEntryDto
    {
        public string BorderPointName { get; set; } = default!;
        public DateTime EnqueuedAt { get; set; }
        public int Position { get; set; }
        public TimeSpan EstimatedWaitTime { get; set; }
    }
}
