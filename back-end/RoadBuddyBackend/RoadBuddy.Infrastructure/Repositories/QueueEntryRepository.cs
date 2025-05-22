using Microsoft.EntityFrameworkCore;
using RoadBuddy.Infrastructure.Persistence;
using RoadBuddy.Domain.Entities;
using RoadBuddy.Application.Interfaces;

namespace RoadBuddy.Infrastructure.Repositories
{

    public class QueueEntryRepository : IQueueEntryRepository
    {
        private readonly ApplicationDbContext _context;

        public QueueEntryRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<int> GetNextPositionAsync(Guid borderPointId)
        {
            var maxPosition = await _context.QueueEntries
                .Where(q => q.BorderPointId == borderPointId)
                .MaxAsync(q => (int?)q.Position) ?? 0;
            return maxPosition + 1;
        }

        public async Task AddAsync(QueueEntry entry)
        {
            await _context.QueueEntries.AddAsync(entry);
        }

        public async Task<List<QueueEntry>> GetByUserIdAsync(Guid userId)
        {
            return await _context.QueueEntries
                .Include(q => q.BorderPoint)
                .Where(q => q.UserId == userId)
                .OrderBy(q => q.EnqueuedAt)
                .ToListAsync();
        }

        public async Task<QueueEntry?> GetByIdAsync(Guid id)
        {
            return await _context.QueueEntries.FindAsync(id);
        }

        public void Delete(QueueEntry entry)
        {
            _context.QueueEntries.Remove(entry);
        }

    }

}
