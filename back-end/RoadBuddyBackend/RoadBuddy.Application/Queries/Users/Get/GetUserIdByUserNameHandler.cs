using MediatR;
using RoadBuddy.Application.Interfaces;

namespace RoadBuddy.Application.Queries.Users.Get
{
    public class GetUserIdByUserNameHandler : IRequestHandler<GetUserIdByUserNameQuery, Guid?>
    {
        private readonly IUserRepository _userRepository;

        public GetUserIdByUserNameHandler(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<Guid?> Handle(GetUserIdByUserNameQuery request, CancellationToken cancellationToken)
        {
            return await _userRepository.GetUserIdByUserNameAsync(request.UserName, cancellationToken);
        }
    }
}
