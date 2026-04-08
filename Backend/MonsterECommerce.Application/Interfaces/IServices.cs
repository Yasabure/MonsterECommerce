using System.Collections.Generic;
using System.Threading.Tasks;
using MonsterECommerce.Application.DTOs;

namespace MonsterECommerce.Application.Interfaces
{
    public interface IEmailService
    {
        Task SendVerificationCodeAsync(string to, string code, string type);
    }

    public interface IUserService
    {
        Task<AuthResponseDto> AuthenticateAsync(LoginDto loginDto);
        Task<AuthResponseDto> RegisterAsync(RegisterWithCodeDto dto);
        Task<bool> SendVerificationCodeAsync(string email, string type);
        Task<bool> ResetPasswordAsync(ResetPasswordDto dto);
    }

    public interface IProductService
    {
        Task<IEnumerable<ProductDto>> GetAllAsync();
        Task<ProductDto> GetByIdAsync(int id);
        Task<IEnumerable<ProductDto>> SearchAsync(string name);
        Task<ProductDto> CreateAsync(SaveProductDto dto);
        Task<ProductDto> UpdateAsync(int id, SaveProductDto dto);
        Task<bool> DeleteAsync(int id);
    }

    public interface ICartService
    {
        Task<CartDto> GetByUserIdAsync(int userId);
        Task AddToCartAsync(int userId, int productId, int quantity);
        Task UpdateQuantityAsync(int userId, int productId, int quantity);
        Task RemoveFromCartAsync(int userId, int productId);
        Task ClearCartAsync(int userId);
    }

    public interface IOrderService
    {
        Task<OrderDto> PlaceOrderAsync(int userId, string paymentMethod);
        Task<IEnumerable<OrderDto>> GetUserOrdersAsync(int userId);
        Task<OrderDto> GetOrderByIdAsync(int userId, int orderId);
    }
}
