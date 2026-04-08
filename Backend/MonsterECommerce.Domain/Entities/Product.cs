namespace MonsterECommerce.Domain.Entities
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string ImageUrl { get; set; }
        public int StockQuantity { get; set; }
        public string Category { get; set; } = "Monster Energy";

        // Promoção
        public bool IsPromotion { get; set; } = false;
        public int DiscountPercentage { get; set; } = 0;
        public int? PackSize { get; set; }

        // Informações nutricionais / técnicas
        public int? CaffeineMg { get; set; }
        public int? CaloriesKcal { get; set; }
        public int? SugarG { get; set; }
        public int? VolumeMl { get; set; }
        public string? Ingredients { get; set; }
    }
}
