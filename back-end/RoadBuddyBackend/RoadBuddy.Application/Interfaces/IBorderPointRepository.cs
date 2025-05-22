using RoadBuddy.Domain.Entities;

namespace RoadBuddy.Application.Interfaces
{
    public interface IBorderPointRepository
    {
        Task<BorderPoint?> GetByIdAsync(Guid id);
        Task AddAsync(BorderPoint borderPoint);

    }
}
