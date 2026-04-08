using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MonsterECommerce.Application.DTOs;
using MonsterECommerce.Application.Interfaces;
using MonsterECommerce.Domain.Entities;
using MonsterECommerce.Domain.Interfaces;

namespace MonsterECommerce.Application.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IAuthService _authService;
        private readonly ICartRepository _cartRepository;
        private readonly IVerificationCodeRepository _codeRepository;
        private readonly IEmailService _emailService;

        public UserService(
            IUserRepository userRepository,
            IAuthService authService,
            ICartRepository cartRepository,
            IVerificationCodeRepository codeRepository,
            IEmailService emailService)
        {
            _userRepository = userRepository;
            _authService = authService;
            _cartRepository = cartRepository;
            _codeRepository = codeRepository;
            _emailService = emailService;
        }

        public async Task<AuthResponseDto> AuthenticateAsync(LoginDto loginDto)
        {
            var user = await _userRepository.GetByEmailAsync(loginDto.Email);
            if (user == null || !_authService.VerifyPassword(loginDto.Password, user.PasswordHash))
                return null;

            var token = _authService.GenerateToken(user.Id, user.Email, user.Role);
            return new AuthResponseDto
            {
                Token = token,
                User = new UserDto { Id = user.Id, Name = user.Name, Email = user.Email, Role = user.Role }
            };
        }

        public async Task<bool> SendVerificationCodeAsync(string email, string type)
        {
            var code = new Random().Next(100000, 999999).ToString();
            await _codeRepository.AddAsync(new VerificationCode
            {
                Email = email,
                Code = code,
                Type = type,
                ExpiresAt = DateTime.UtcNow.AddMinutes(15)
            });
            await _codeRepository.SaveChangesAsync();
            await _emailService.SendVerificationCodeAsync(email, code, type);
            return true;
        }

        public async Task<AuthResponseDto> RegisterAsync(RegisterWithCodeDto dto)
        {
            var validCode = await _codeRepository.GetValidCodeAsync(dto.Email, dto.Code, "Register");
            if (validCode == null) return null;

            var existingUser = await _userRepository.GetByEmailAsync(dto.Email);
            if (existingUser != null) return null;

            var user = new User
            {
                Name = dto.Name,
                Email = dto.Email,
                PasswordHash = _authService.HashPassword(dto.Password),
                Role = "Customer"
            };

            await _userRepository.AddAsync(user);
            await _userRepository.SaveChangesAsync();

            var cart = new Cart { UserId = user.Id };
            await _cartRepository.AddAsync(cart);
            await _cartRepository.SaveChangesAsync();

            validCode.Used = true;
            await _codeRepository.SaveChangesAsync();

            var token = _authService.GenerateToken(user.Id, user.Email, user.Role);
            return new AuthResponseDto
            {
                Token = token,
                User = new UserDto { Id = user.Id, Name = user.Name, Email = user.Email, Role = user.Role }
            };
        }

        public async Task<bool> ResetPasswordAsync(ResetPasswordDto dto)
        {
            var validCode = await _codeRepository.GetValidCodeAsync(dto.Email, dto.Code, "PasswordReset");
            if (validCode == null) return false;

            var user = await _userRepository.GetByEmailAsync(dto.Email);
            if (user == null) return false;

            user.PasswordHash = _authService.HashPassword(dto.NewPassword);
            _userRepository.Update(user);

            validCode.Used = true;
            await _userRepository.SaveChangesAsync();

            return true;
        }
    }

    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;

        public ProductService(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        private static ProductDto ToDto(Product p) => new ProductDto
        {
            Id = p.Id,
            Name = p.Name,
            Description = p.Description,
            Price = p.Price,
            ImageUrl = p.ImageUrl,
            StockQuantity = p.StockQuantity,
            Category = p.Category,
            IsPromotion = p.IsPromotion,
            DiscountPercentage = p.DiscountPercentage,
            PackSize = p.PackSize,
            CaffeineMg = p.CaffeineMg,
            CaloriesKcal = p.CaloriesKcal,
            SugarG = p.SugarG,
            VolumeMl = p.VolumeMl,
            Ingredients = p.Ingredients
        };

        public async Task<IEnumerable<ProductDto>> GetAllAsync()
        {
            var products = await _productRepository.GetAllAsync();
            return products.Select(ToDto);
        }

        public async Task<ProductDto> GetByIdAsync(int id)
        {
            var p = await _productRepository.GetByIdAsync(id);
            return p == null ? null : ToDto(p);
        }

        public async Task<IEnumerable<ProductDto>> SearchAsync(string name)
        {
            var products = await _productRepository.SearchByNameAsync(name);
            return products.Select(ToDto);
        }

        public async Task<ProductDto> CreateAsync(SaveProductDto dto)
        {
            var product = new Product
            {
                Name = dto.Name,
                Description = dto.Description,
                Price = dto.Price,
                ImageUrl = dto.ImageUrl,
                StockQuantity = dto.StockQuantity,
                Category = dto.Category ?? "Monster Energy",
                IsPromotion = dto.IsPromotion,
                DiscountPercentage = dto.DiscountPercentage,
                PackSize = dto.PackSize,
                CaffeineMg = dto.CaffeineMg,
                CaloriesKcal = dto.CaloriesKcal,
                SugarG = dto.SugarG,
                VolumeMl = dto.VolumeMl,
                Ingredients = dto.Ingredients
            };
            await _productRepository.AddAsync(product);
            await _productRepository.SaveChangesAsync();
            return ToDto(product);
        }

        public async Task<ProductDto> UpdateAsync(int id, SaveProductDto dto)
        {
            var product = await _productRepository.GetByIdAsync(id);
            if (product == null) return null;
            product.Name = dto.Name;
            product.Description = dto.Description;
            product.Price = dto.Price;
            product.ImageUrl = dto.ImageUrl;
            product.StockQuantity = dto.StockQuantity;
            product.Category = dto.Category ?? "Monster Energy";
            product.IsPromotion = dto.IsPromotion;
            product.DiscountPercentage = dto.DiscountPercentage;
            product.PackSize = dto.PackSize;
            product.CaffeineMg = dto.CaffeineMg;
            product.CaloriesKcal = dto.CaloriesKcal;
            product.SugarG = dto.SugarG;
            product.VolumeMl = dto.VolumeMl;
            product.Ingredients = dto.Ingredients;
            _productRepository.Update(product);
            await _productRepository.SaveChangesAsync();
            return ToDto(product);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var product = await _productRepository.GetByIdAsync(id);
            if (product == null) return false;
            _productRepository.Delete(product);
            await _productRepository.SaveChangesAsync();
            return true;
        }
    }

    public class CartService : ICartService
    {
        private readonly ICartRepository _cartRepository;
        private readonly IProductRepository _productRepository;

        public CartService(ICartRepository cartRepository, IProductRepository productRepository)
        {
            _cartRepository = cartRepository;
            _productRepository = productRepository;
        }

        public async Task<CartDto> GetByUserIdAsync(int userId)
        {
            var cart = await _cartRepository.GetByUserIdAsync(userId);
            if (cart == null) return null;

            static decimal EffectivePrice(Product p) =>
                p.DiscountPercentage > 0
                    ? p.Price * (1 - p.DiscountPercentage / 100m)
                    : p.Price;

            return new CartDto
            {
                Id = cart.Id,
                UserId = cart.UserId,
                Items = cart.Items.Select(i => new CartItemDto
                {
                    Id = i.Id,
                    ProductId = i.ProductId,
                    ProductName = i.Product.Name,
                    ProductPrice = EffectivePrice(i.Product),
                    ProductImageUrl = i.Product.ImageUrl,
                    Quantity = i.Quantity,
                    StockQuantity = i.Product.StockQuantity
                }).ToList(),
                TotalAmount = cart.Items.Sum(i => i.Quantity * EffectivePrice(i.Product))
            };
        }

        public async Task AddToCartAsync(int userId, int productId, int quantity)
        {
            var cart = await _cartRepository.GetByUserIdAsync(userId);
            if (cart == null) return;

            var existingItem = cart.Items.FirstOrDefault(i => i.ProductId == productId);
            if (existingItem != null)
            {
                existingItem.Quantity += quantity;
            }
            else
            {
                cart.Items.Add(new CartItem
                {
                    CartId = cart.Id,
                    ProductId = productId,
                    Quantity = quantity
                });
            }

            await _cartRepository.SaveChangesAsync();
        }

        public async Task RemoveFromCartAsync(int userId, int productId)
        {
            var cart = await _cartRepository.GetByUserIdAsync(userId);
            if (cart == null) return;

            var item = cart.Items.FirstOrDefault(i => i.ProductId == productId);
            if (item != null)
            {
                cart.Items.Remove(item);
                await _cartRepository.SaveChangesAsync();
            }
        }

        public async Task UpdateQuantityAsync(int userId, int productId, int quantity)
        {
            var cart = await _cartRepository.GetByUserIdAsync(userId);
            if (cart == null) return;

            var item = cart.Items.FirstOrDefault(i => i.ProductId == productId);
            if (item == null) return;

            if (quantity <= 0)
                cart.Items.Remove(item);
            else
                item.Quantity = quantity;

            await _cartRepository.SaveChangesAsync();
        }

        public async Task ClearCartAsync(int userId)
        {
            var cart = await _cartRepository.GetByUserIdAsync(userId);
            if (cart != null)
            {
                cart.Items.Clear();
                await _cartRepository.SaveChangesAsync();
            }
        }
    }

    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly ICartRepository _cartRepository;
        private readonly IProductRepository _productRepository;

        public OrderService(IOrderRepository orderRepository, ICartRepository cartRepository, IProductRepository productRepository)
        {
            _orderRepository = orderRepository;
            _cartRepository = cartRepository;
            _productRepository = productRepository;
        }

        public async Task<OrderDto> PlaceOrderAsync(int userId, string paymentMethod)
        {
            var cart = await _cartRepository.GetByUserIdAsync(userId);
            if (cart == null || !cart.Items.Any()) return null;

            // Validate stock for all items before creating the order
            foreach (var item in cart.Items)
            {
                if (item.Quantity > item.Product.StockQuantity)
                    return null;
            }

            static decimal EffectivePrice(Product p) =>
                p.DiscountPercentage > 0 ? p.Price * (1 - p.DiscountPercentage / 100m) : p.Price;

            var order = new Order
            {
                UserId = userId,
                OrderDate = DateTime.UtcNow,
                TotalAmount = cart.Items.Sum(i => i.Quantity * EffectivePrice(i.Product)),
                Status = "Success",
                Items = cart.Items.Select(i => new OrderItem
                {
                    ProductId = i.ProductId,
                    Quantity = i.Quantity,
                    UnitPrice = EffectivePrice(i.Product)
                }).ToList()
            };

            order.Payment = new Payment
            {
                OrderId = order.Id,
                TransactionId = Guid.NewGuid().ToString(),
                Status = "Success",
                PaymentDate = DateTime.UtcNow,
                PaymentMethod = paymentMethod
            };

            await _orderRepository.AddAsync(order);
            await _orderRepository.SaveChangesAsync();

            // Reduce stock for each ordered product
            foreach (var item in cart.Items)
            {
                item.Product.StockQuantity -= item.Quantity;
                _productRepository.Update(item.Product);
            }

            // Clear cart
            cart.Items.Clear();
            await _cartRepository.SaveChangesAsync();

            return new OrderDto
            {
                Id = order.Id,
                UserId = order.UserId,
                OrderDate = order.OrderDate,
                TotalAmount = order.TotalAmount,
                Status = order.Status,
                Items = order.Items.Select(oi => new OrderItemDto
                {
                    ProductId = oi.ProductId,
                    Quantity = oi.Quantity,
                    UnitPrice = oi.UnitPrice
                }).ToList(),
                Payment = new PaymentDto
                {
                    TransactionId = order.Payment.TransactionId,
                    Status = order.Payment.Status,
                    PaymentDate = order.Payment.PaymentDate,
                    PaymentMethod = order.Payment.PaymentMethod
                }
            };
        }

        public async Task<OrderDto> GetOrderByIdAsync(int userId, int orderId)
        {
            var o = await _orderRepository.GetByIdWithDetailsAsync(orderId);
            if (o == null || o.UserId != userId) return null;

            return new OrderDto
            {
                Id = o.Id,
                UserId = o.UserId,
                OrderDate = o.OrderDate,
                TotalAmount = o.TotalAmount,
                Status = o.Status,
                Items = o.Items.Select(oi => new OrderItemDto
                {
                    ProductId = oi.ProductId,
                    ProductName = oi.Product.Name,
                    Quantity = oi.Quantity,
                    UnitPrice = oi.UnitPrice
                }).ToList(),
                Payment = o.Payment != null ? new PaymentDto
                {
                    TransactionId = o.Payment.TransactionId,
                    Status = o.Payment.Status,
                    PaymentDate = o.Payment.PaymentDate,
                    PaymentMethod = o.Payment.PaymentMethod
                } : null
            };
        }

        public async Task<IEnumerable<OrderDto>> GetUserOrdersAsync(int userId)
        {
            var orders = await _orderRepository.GetByUserIdAsync(userId);
            return orders.Select(o => new OrderDto
            {
                Id = o.Id,
                UserId = o.UserId,
                OrderDate = o.OrderDate,
                TotalAmount = o.TotalAmount,
                Status = o.Status,
                Items = o.Items.Select(oi => new OrderItemDto
                {
                    ProductId = oi.ProductId,
                    ProductName = oi.Product.Name,
                    Quantity = oi.Quantity,
                    UnitPrice = oi.UnitPrice
                }).ToList(),
                Payment = o.Payment != null ? new PaymentDto
                {
                    TransactionId = o.Payment.TransactionId,
                    Status = o.Payment.Status,
                    PaymentDate = o.Payment.PaymentDate,
                    PaymentMethod = o.Payment.PaymentMethod
                } : null
            });
        }
    }
}
