using ApiAutopartesG15.DTOs;
using ApiAutopartesG15.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace ApiAutopartesG15.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly ILogger<AuthController> _logger;

        public AuthController(IAuthService authService, ILogger<AuthController> logger)
        {
            _authService = authService;
            _logger = logger;
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginDTO dto)
        {
            try
            {
                var result = await _authService.LoginAsync(dto);

                if (result == null)
                    return Unauthorized(new { message = "Email y/o password incorrecto" });

                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error en login");
                return StatusCode(500, new { message = "Error interno del servidor" });
            }
        }

        // Endpoints de prueba (despues los podes borrar)
        [HttpGet("me")]
        [Authorize]
        public IActionResult Me()
        {
            return Ok(new
            {
                idUsuario = User.FindFirstValue(ClaimTypes.NameIdentifier),
                email = User.FindFirstValue(ClaimTypes.Email),
                rol = User.FindFirstValue(ClaimTypes.Role)
            });
        }
        [HttpGet("solo-admin")]
        [Authorize(Roles = "Admin")]
        public IActionResult SoloAdmin() => Ok(new { message = "Sos admin" });
    }
}
