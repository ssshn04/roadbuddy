using MediatR;

namespace RoadBuddy.Application.Commands.Login
{
    public record LoginUserCommand(string UserName, string Password) : IRequest<string>;
}
