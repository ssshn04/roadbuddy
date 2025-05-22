using MediatR;
using RoadBuddy.Application.DTOs.VehicleDTOs;
using RoadBuddy.Application.Interfaces;

namespace RoadBuddy.Application.Queries.UserProfile.Get
{
    public class GetUserProfileQueryHandler : IRequestHandler<GetUserProfileQuery, UserProfileDto>
    {
        private readonly IUserRepository _userRepository;

        public GetUserProfileQueryHandler(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<UserProfileDto> Handle(GetUserProfileQuery request, CancellationToken cancellationToken)
        {
            var user = await _userRepository.GetByUserNameAsync(request.UserName, cancellationToken);

            if (user == null)
                return null;

            var profileDto = new UserProfileDto
            {
                UserName = user.UserName,
                Email = user.Email,
                Role = user.Role.ToString(),
                VehiclesCount = user.Vehicles.Count,
                QueueEntriesCount = user.QueueEntries.Count,
                ReviewsCount = user.Reviews.Count,
                Vehicles = user.Vehicles.Select(v => new VehicleDto
                {
                    Id = v.Id,
                    Brand = v.Brand,
                    Model = v.Model,
                    PlateNumber = v.PlateNumber,
                    Year = v.Year
                }).ToList()
            };

            return profileDto;
        }
    }
}
