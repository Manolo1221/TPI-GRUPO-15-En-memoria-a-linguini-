using ApiAutopartesG15.Models;

namespace ApiAutopartesG15.Repositories.Interfaces
{
    public interface IUsuarioRepository
    {
        Task<Usuario?> GetByEmailAsync(string email);
        Task<bool> ExistsByEmailAsync(string email);
        Task CrearClienteConUsuarioAsync(Cliente cliente, Usuario usuario);
    }
}
