using RoadBuddy.Domain.Entities;

namespace RoadBuddy.Application.Interfaces
{
    public interface IQueueEntryRepository
    {
        Task<List<QueueEntry>> GetByUserIdAsync(Guid userId);
        Task<int> GetNextPositionAsync(Guid borderPointId);
        Task AddAsync(QueueEntry entry);
        Task<QueueEntry?> GetByIdAsync(Guid id);
        void Delete(QueueEntry entry);

    }
}
