using System.Collections.Generic;
using System.Threading.Tasks;

namespace MonsterECommerce.Domain.Interfaces
{
    public interface IRepository<T> where T : class
    {
        Task<T> GetByIdAsync(int id);
        Task<IEnumerable<T>> GetAllAsync();
        Task AddAsync(T entity);
        void Update(T entity);
        void Delete(T entity);
        Task SaveChangesAsync();
    }

    public interface IUserRepository : IRepository<Entities.User>
    {
        Task<Entities.User> GetByEmailAsync(string email);
    }

    public interface IProductRepository : IRepository<Entities.Product>
    {
        Task<IEnumerable<Entities.Product>> SearchByNameAsync(string name);
    }

    public interface ICartRepository : IRepository<Entities.Cart>
    {
        Task<Entities.Cart> GetByUserIdAsync(int userId);
    }

    public interface IOrderRepository : IRepository<Entities.Order>
    {
        Task<IEnumerable<Entities.Order>> GetByUserIdAsync(int userId);
        Task<Entities.Order> GetByIdWithDetailsAsync(int orderId);
    }

    public interface IVerificationCodeRepository
    {
        Task AddAsync(Entities.VerificationCode code);
        Task<Entities.VerificationCode> GetValidCodeAsync(string email, string code, string type);
        Task SaveChangesAsync();
    }
}
