using MediatR;
using RoadBuddy.Application.DTOs;

namespace RoadBuddy.Application.Queries.UserProfile.Get
{
    public record GetUserProfileQuery(string UserName) : IRequest<UserProfileDto>;
}
