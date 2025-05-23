using RoadBuddy.Domain.Entities;
namespace RoadBuddy.Application.Interfaces
{
    public interface IUserRepository
    {
        Task<bool> IsEmailTakenAsync(string email, CancellationToken cancellationToken);
        Task AddUserAsync(User user, CancellationToken cancellationToken);
        Task<Guid?> GetUserIdByUserNameAsync(string userName, CancellationToken cancellationToken);
        Task<User?> GetByUserNameAsync(string userName, CancellationToken cancellationToken);
        
    }
}