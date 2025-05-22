using RoadBuddy.Application.Interfaces;
using RoadBuddy.Infrastructure.Persistence;

namespace RoadBuddy.Infrastructure.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _context;

        public IUserRepository UserRepository { get; }
        public IQueueEntryRepository QueueEntryRepository { get; }
        public IVehicleRepository VehicleRepository { get; }
        public IBorderPointRepository BorderPointRepository { get; }

        public UnitOfWork(
            ApplicationDbContext context,
            IUserRepository userRepository,
            IVehicleRepository vehicleRepository,
            IQueueEntryRepository queueEntryRepository,
            IBorderPointRepository borderPointRepository)
        {
            _context = context;
            UserRepository = userRepository;
            VehicleRepository = vehicleRepository;
            QueueEntryRepository = queueEntryRepository;
            BorderPointRepository = borderPointRepository;
        }

        public Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            return _context.SaveChangesAsync(cancellationToken);
        }
    }
}
