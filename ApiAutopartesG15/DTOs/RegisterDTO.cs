using System.ComponentModel.DataAnnotations;

namespace ApiAutopartesG15.DTOs
{
    public class RegisterDTO
    {
        [Required, EmailAddress, MaxLength(150)]
        public string Email { get; set; } = null!;

        [Required, MinLength(6)]
        public string Password { get; set; } = null!;

        [Required, MaxLength(100)]
        public string Nombre { get; set; } = null!;

        [Required, MaxLength(100)]
        public string Direccion { get; set; } = null!;

        [Required]
        public int Altura { get; set; }

        public string? Barrio { get; set; }

        [Required]
        public string Ciudad { get; set; } = null!;

        [Required]
        public string Provincia { get; set; } = null!;

        public string TipoCliente { get; set; } = "Particular";

        public string? Telefono { get; set; }
    }
}
