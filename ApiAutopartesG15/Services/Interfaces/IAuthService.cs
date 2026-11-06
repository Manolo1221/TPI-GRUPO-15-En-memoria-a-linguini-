using ApiAutopartesG15.DTOs;

namespace ApiAutopartesG15.Services.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResponseDTO?> LoginAsync(LoginDTO dto);   // null = credenciales invalidas
    }
}
