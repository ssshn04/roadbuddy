using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using RoadBuddy.Application.Interfaces;
using RoadBuddy.Domain.Entities;
using RoadBuddy.Domain.Enums;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;


namespace RoadBuddy.Application.Commands.Register
{
    public class RegisterUserCommandHandler : IRequestHandler<RegisterUserCommand, string>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IConfiguration _configuration;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public RegisterUserCommandHandler(
            IUnitOfWork unitOfWork,
            IConfiguration configuration,
            IHttpContextAccessor httpContextAccessor)
        {
            _unitOfWork = unitOfWork;
            _configuration = configuration;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<string> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
        {
            var dto = request.UserDto;

            // Перевірка унікальності email
            if (await _unitOfWork.UserRepository.IsEmailTakenAsync(dto.Email, cancellationToken))
                throw new Exception("Email вже використовується");

            var existingUser = await _unitOfWork.UserRepository.GetByUserNameAsync(dto.UserName, cancellationToken);
            if (existingUser != null)
                throw new Exception("Ім'я користувача вже використовується");

            // Парсинг ролі
            if (!Enum.TryParse<UserRole>(dto.Role, true, out var role))
                throw new Exception("Некоректна роль");

            var user = new User
            {
                UserName = dto.UserName,
                Email = dto.Email,
                PasswordHash = dto.Password,  // Звичайно, краще хешувати пароль окремо
                Role = role
            };

            await _unitOfWork.UserRepository.AddUserAsync(user, cancellationToken);

            // Зберігаємо всі зміни централізовано через UnitOfWork
            await _unitOfWork.SaveChangesAsync(cancellationToken);

            // Генерація токену
            var token = GenerateJwtToken(user);

            _httpContextAccessor.HttpContext!.Response.Cookies.Append("jwt", token, new CookieOptions
            {
                HttpOnly = false,
                Secure = false,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddDays(7)
            });

            return token;
        }

        private string GenerateJwtToken(User user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim("id", user.Id.ToString()),
                new Claim(ClaimTypes.Role, user.Role.ToString())
            };

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
