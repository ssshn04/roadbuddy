using Microsoft.EntityFrameworkCore;
using RoadBuddy.Domain.Entities;
using RoadBuddy.Infrastructure.Persistence;
using RoadBuddy.Application.Interfaces;

namespace RoadBuddy.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;

        public UserRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<bool> IsEmailTakenAsync(string email, CancellationToken cancellationToken)
        {
            return await _context.Users.AnyAsync(u => u.Email == email, cancellationToken);
        }

        public async Task AddUserAsync(User user, CancellationToken cancellationToken)
        {
            await _context.Users.AddAsync(user, cancellationToken);
        }

        public async Task<User?> GetByUserNameAsync(string userName, CancellationToken cancellationToken = default)
        {
            return await _context.Users
                .Include(u => u.Vehicles)
                .Include(u => u.QueueEntries)
                .Include(u => u.Reviews)
                .FirstOrDefaultAsync(u => u.UserName == userName, cancellationToken);
        }
    }
}
