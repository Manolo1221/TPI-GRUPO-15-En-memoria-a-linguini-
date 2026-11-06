using ApiAutopartesG15.Models;
using ApiAutopartesG15.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ApiAutopartesG15.Repositories.Implementations
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly DatosAutosContext _context;

        public UsuarioRepository(DatosAutosContext context)
        {
            _context = context;
        }

        public async Task<Usuario?> GetByEmailAsync(string email)
        {
            return await _context.Usuarios
                .FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<bool> ExistsByEmailAsync(string email)
        {
            return await _context.Usuarios.AnyAsync(u => u.Email == email);
        }

        // Crea el cliente y su usuario en una sola transaccion (relacion 1 a 1)
        public async Task CrearClienteConUsuarioAsync(Cliente cliente, Usuario usuario)
        {
            await using var tx = await _context.Database.BeginTransactionAsync();

            _context.Clientes.Add(cliente);
            await _context.SaveChangesAsync();          // genera cliente.IdCliente

            usuario.IdCliente = cliente.IdCliente;
            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();

            await tx.CommitAsync();
        }
    }
}
