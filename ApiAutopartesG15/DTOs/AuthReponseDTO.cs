namespace ApiAutopartesG15.DTOs
{
    public class AuthResponseDTO
    {
        public string Token { get; set; } = null!;
        public DateTime Expira { get; set; }
        public string Email { get; set; } = null!;
        public string Rol { get; set; } = null!;
        public int? IdCliente { get; set; }
    }
}
