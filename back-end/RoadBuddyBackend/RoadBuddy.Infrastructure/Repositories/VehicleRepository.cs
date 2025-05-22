using Microsoft.EntityFrameworkCore;
using RoadBuddy.Application.Interfaces;
using RoadBuddy.Domain.Entities;
using RoadBuddy.Infrastructure.Persistence;

namespace RoadBuddy.Infrastructure.Repositories
{
    public class VehicleRepository : IVehicleRepository
    {
        private readonly ApplicationDbContext _context;

        public VehicleRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(Vehicle vehicle, CancellationToken cancellationToken = default)
        {
            await _context.Vehicles.AddAsync(vehicle, cancellationToken);
        }

        public async Task<Vehicle?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        {
            return await _context.Vehicles.FindAsync(new object[] { id }, cancellationToken);
        }

        public async Task<IEnumerable<Vehicle>> GetByUserIdAsync(Guid userId, CancellationToken cancellationToken = default)
        {
            return await _context.Vehicles
                .Where(v => v.UserId == userId)
                .ToListAsync(cancellationToken);
        }
    }
}
