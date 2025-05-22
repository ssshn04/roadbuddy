using MediatR;
using RoadBuddy.Application.DTOs;

namespace RoadBuddy.Application.Commands.Register
{
    public class RegisterUserCommand : IRequest<string>  
    {
        public RegisterUserDto UserDto { get; set; } = null!;        
    }

}
