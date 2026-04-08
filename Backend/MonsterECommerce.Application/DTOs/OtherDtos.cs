using System;
using System.Collections.Generic;

namespace MonsterECommerce.Application.DTOs
{
    public class ProductDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string ImageUrl { get; set; }
        public int StockQuantity { get; set; }
        public string Category { get; set; }
        public bool IsPromotion { get; set; }
        public int DiscountPercentage { get; set; }
        public int? PackSize { get; set; }
        public int? CaffeineMg { get; set; }
        public int? CaloriesKcal { get; set; }
        public int? SugarG { get; set; }
        public int? VolumeMl { get; set; }
        public string? Ingredients { get; set; }
    }

    public class SaveProductDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string ImageUrl { get; set; }
        public int StockQuantity { get; set; }
        public string Category { get; set; }
        public bool IsPromotion { get; set; }
        public int DiscountPercentage { get; set; }
        public int? PackSize { get; set; }
        public int? CaffeineMg { get; set; }
        public int? CaloriesKcal { get; set; }
        public int? SugarG { get; set; }
        public int? VolumeMl { get; set; }
        public string? Ingredients { get; set; }
    }

    public class CartDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public List<CartItemDto> Items { get; set; } = new List<CartItemDto>();
        public decimal TotalAmount { get; set; }
    }

    public class CartItemDto
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public decimal ProductPrice { get; set; }
        public string ProductImageUrl { get; set; }
        public int Quantity { get; set; }
        public int StockQuantity { get; set; }
    }

    public class OrderDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public DateTime OrderDate { get; set; }
        public decimal TotalAmount { get; set; }
        public string Status { get; set; }
        public List<OrderItemDto> Items { get; set; } = new List<OrderItemDto>();
        public PaymentDto Payment { get; set; }
    }

    public class OrderItemDto
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
    }

    public class PaymentDto
    {
        public string TransactionId { get; set; }
        public string Status { get; set; }
        public DateTime PaymentDate { get; set; }
        public string PaymentMethod { get; set; }
    }
}
