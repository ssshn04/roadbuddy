using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RoadBuddy.Application.Interfaces
{
    public interface IUnitOfWork
    {
        IUserRepository UserRepository { get; }
        IVehicleRepository VehicleRepository { get; }
        IQueueEntryRepository QueueEntryRepository { get; }
        IBorderPointRepository BorderPointRepository { get; }
        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
    }

}
