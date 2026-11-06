using ApiAutopartesG15.DTOs;
using ApiAutopartesG15.Models;
using ApiAutopartesG15.Repositories.Interfaces;
using ApiAutopartesG15.Services.Interfaces;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ApiAutopartesG15.Services.Implementations
{
    public class AuthService : IAuthService
    {
        private readonly IUsuarioRepository _repo;
        private readonly IConfiguration _config;

        public AuthService(IUsuarioRepository repo, IConfiguration config)
        {
            _repo = repo;
            _config = config;
        }

        public async Task<AuthResponseDTO?> LoginAsync(LoginDTO dto)
        {
            var email = dto.Email.Trim().ToLower();
            var usuario = await _repo.GetByEmailAsync(email);

            if (usuario == null || !usuario.Activo ||
                !BCrypt.Net.BCrypt.Verify(dto.Password, usuario.PasswordHash))
                return null;

            return GenerarToken(usuario);
        }

        private AuthResponseDTO GenerarToken(Usuario usuario)
        {
            var rol = usuario.EsAdmin ? "Admin" : "Cliente";

            var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, usuario.IdUsuario.ToString()),
            new Claim(ClaimTypes.Email, usuario.Email),
            new Claim(ClaimTypes.Role, rol)
        };

            if (usuario.IdCliente.HasValue)
                claims.Add(new Claim("idCliente", usuario.IdCliente.Value.ToString()));

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expira = DateTime.UtcNow.AddMinutes(int.Parse(_config["Jwt:ExpireMinutes"] ?? "30"));

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: expira,
                signingCredentials: creds);

            return new AuthResponseDTO
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                Expira = expira,
                Email = usuario.Email,
                Rol = rol,
                IdCliente = usuario.IdCliente
            };
        }
    }
}
