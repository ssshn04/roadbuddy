using RoadBuddy.Application.Interfaces;
using RoadBuddy.Domain.Entities;
using RoadBuddy.Infrastructure.Persistence;


namespace RoadBuddy.Infrastructure.Repositories
{

    public class BorderPointRepository : IBorderPointRepository
    {
        private readonly ApplicationDbContext _context;

        public BorderPointRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<BorderPoint?> GetByIdAsync(Guid id)
        {
            return await _context.BorderPoints.FindAsync(id);
        }

        public async Task AddAsync(BorderPoint borderPoint)
        {
            await _context.BorderPoints.AddAsync(borderPoint);
        }
    }
}
