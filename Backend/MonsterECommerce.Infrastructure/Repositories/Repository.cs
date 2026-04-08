using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MonsterECommerce.Domain.Entities;
using MonsterECommerce.Domain.Interfaces;
using MonsterECommerce.Infrastructure.Data;

namespace MonsterECommerce.Infrastructure.Repositories
{
    public class Repository<T> : IRepository<T> where T : class
    {
        protected readonly MonsterDbContext _context;

        public Repository(MonsterDbContext context)
        {
            _context = context;
        }

        public async Task<T> GetByIdAsync(int id)
        {
            return await _context.Set<T>().FindAsync(id);
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await _context.Set<T>().ToListAsync();
        }

        public async Task AddAsync(T entity)
        {
            await _context.Set<T>().AddAsync(entity);
        }

        public void Update(T entity)
        {
            _context.Set<T>().Update(entity);
        }

        public void Delete(T entity)
        {
            _context.Set<T>().Remove(entity);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }

    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(MonsterDbContext context) : base(context) { }

        public async Task<User> GetByEmailAsync(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        }
    }

    public class ProductRepository : Repository<Product>, IProductRepository
    {
        public ProductRepository(MonsterDbContext context) : base(context) { }

        public async Task<IEnumerable<Product>> SearchByNameAsync(string name)
        {
            var lower = name.ToLower();
            return await _context.Products
                .Where(p => p.Name.ToLower().Contains(lower))
                .ToListAsync();
        }
    }

    public class CartRepository : Repository<Cart>, ICartRepository
    {
        public CartRepository(MonsterDbContext context) : base(context) { }

        public async Task<Cart> GetByUserIdAsync(int userId)
        {
            return await _context.Carts
                .Include(c => c.Items)
                .ThenInclude(i => i.Product)
                .FirstOrDefaultAsync(c => c.UserId == userId);
        }
    }

    public class OrderRepository : Repository<Order>, IOrderRepository
    {
        public OrderRepository(MonsterDbContext context) : base(context) { }

        public async Task<IEnumerable<Order>> GetByUserIdAsync(int userId)
        {
            return await _context.Orders
                .Include(o => o.Items)
                .ThenInclude(i => i.Product)
                .Include(o => o.Payment)
                .Where(o => o.UserId == userId)
                .OrderByDescending(o => o.OrderDate)
                .ToListAsync();
        }

        public async Task<Order> GetByIdWithDetailsAsync(int orderId)
        {
            return await _context.Orders
                .Include(o => o.Items)
                .ThenInclude(i => i.Product)
                .Include(o => o.Payment)
                .FirstOrDefaultAsync(o => o.Id == orderId);
        }
    }

    public class VerificationCodeRepository : IVerificationCodeRepository
    {
        private readonly MonsterDbContext _context;

        public VerificationCodeRepository(MonsterDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(VerificationCode code)
        {
            await _context.VerificationCodes.AddAsync(code);
        }

        public async Task<VerificationCode> GetValidCodeAsync(string email, string code, string type)
        {
            return await _context.VerificationCodes
                .Where(v => v.Email.ToLower() == email.ToLower()
                         && v.Code == code.Trim()
                         && v.Type == type
                         && !v.Used
                         && v.ExpiresAt > System.DateTime.UtcNow)
                .OrderByDescending(v => v.ExpiresAt)
                .FirstOrDefaultAsync();
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
