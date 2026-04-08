-- ============================================================
--  Novos produtos Monster Energy — 50 unidades cada
-- ============================================================

INSERT INTO "Products" (
  "Name", "Description", "Price", "ImageUrl", "StockQuantity", "Category",
  "VolumeMl", "CaffeineMg", "CaloriesKcal", "SugarG", "Ingredients",
  "IsPromotion", "DiscountPercentage"
)
VALUES

-- Monster Energy Zero Ultra
(
  'Monster Energy Zero Ultra',
  'O sabor levemente cítrico do Zero Ultra sem açúcar e sem calorias. A versão mais leve do Monster clássico, com toda a energia da fórmula original.',
  10.50,
  NULL,
  50,
  'Monster Ultra',
  473, 140, 10, 0,
  'Água gaseificada, eritritol, ácido cítrico, taurina (0,4%), cafeína (0,03%), extrato de guaraná, aromas naturais, vitaminas (B3, B2, B6, B12), sucralose, acesulfame K.',
  false, 0
),

-- Monster Energy Lo-Carb
(
  'Monster Energy Lo-Carb',
  'O energético Monster com baixo carboidrato e sabor suave. Ideal para quem quer energia sem exagerar nos açúcares.',
  10.50,
  NULL,
  50,
  'Monster Energy',
  473, 140, 30, 6,
  'Água gaseificada, eritritol, sacarose, ácido cítrico, taurina (0,4%), cafeína (0,03%), extrato de guaraná, aromas naturais, vitaminas (B3, B2, B6, B12), sucralose, acesulfame K.',
  false, 0
),

-- Monster Energy Assault
(
  'Monster Energy Assault',
  'Sabor audacioso de frutas vermelhas com toque cítrico. Design militar e energia máxima para missões extremas.',
  9.90,
  NULL,
  50,
  'Monster Energy',
  473, 160, 200, 51,
  'Água gaseificada, sacarose, glicose, ácido cítrico, taurina (0,4%), cafeína (0,03%), extrato de guaraná, aromas naturais de frutas vermelhas, vitaminas (B3, B2, B6, B12), corante (E129).',
  false, 0
),

-- Monster Juice Khaos
(
  'Monster Juice Khaos',
  'Metade energético, metade suco de frutas tropicais. O Khaos combina laranja, tangerina e abacaxi para uma explosão de sabor.',
  11.00,
  NULL,
  50,
  'Monster Juiced',
  473, 160, 210, 52,
  'Água gaseificada, sacarose, suco de laranja concentrado, suco de tangerina concentrado, suco de abacaxi concentrado, ácido cítrico, taurina (0,4%), cafeína (0,03%), extrato de guaraná, vitaminas (B3, B2, B6, B12), aromas naturais.',
  false, 0
),

-- Monster Ultra Black
(
  'Monster Ultra Black',
  'Sabor intenso de cereja preta com um toque cítrico. Zero açúcar e zero calorias — o Ultra mais sombrio e marcante da linha.',
  10.50,
  NULL,
  50,
  'Monster Ultra',
  473, 150, 10, 0,
  'Água gaseificada, eritritol, ácido cítrico, taurina (0,4%), cafeína (0,03%), extrato de guaraná, aroma natural de cereja preta, vitaminas (B3, B2, B6, B12), sucralose, acesulfame K, corante (E163 antocianinas).',
  false, 0
),

-- Monster Ultra Gold
(
  'Monster Ultra Gold',
  'Sabor doce e tropical de abacaxi maduro. Zero açúcar e zero calorias — refrescante como um raio de sol em lata.',
  10.50,
  NULL,
  50,
  'Monster Ultra',
  473, 150, 10, 0,
  'Água gaseificada, eritritol, ácido cítrico, taurina (0,4%), cafeína (0,03%), extrato de guaraná, aroma natural de abacaxi, vitaminas (B3, B2, B6, B12), sucralose, acesulfame K, corante (betacaroteno).',
  false, 0
),

-- Monster Ultra Watermelon
(
  'Monster Ultra Watermelon',
  'Sabor suculento e refrescante de melancia gelada. Zero açúcar — perfeito para os dias mais quentes.',
  10.50,
  NULL,
  50,
  'Monster Ultra',
  473, 150, 10, 0,
  'Água gaseificada, eritritol, ácido cítrico, taurina (0,4%), cafeína (0,03%), extrato de guaraná, aroma natural de melancia, vitaminas (B3, B2, B6, B12), sucralose, acesulfame K, corante (E163 antocianinas).',
  false, 0
),

-- Monster Ultra Sunrise
(
  'Monster Ultra Sunrise',
  'Sabor cítrico de laranja com toque suave de tangerina. Zero açúcar — como um amanhecer em cada gole.',
  10.50,
  NULL,
  50,
  'Monster Ultra',
  473, 150, 10, 0,
  'Água gaseificada, eritritol, ácido cítrico, taurina (0,4%), cafeína (0,03%), extrato de guaraná, aromas naturais de laranja e tangerina, vitaminas (B3, B2, B6, B12), sucralose, acesulfame K, corante (betacaroteno).',
  false, 0
),

-- Monster Rehab Tea + Lemonade
(
  'Monster Rehab Tea + Lemonade',
  'Chá com limonada e Monster Energy — não gaseificado, hidratante e energizante. Perfeito para recuperação.',
  12.00,
  NULL,
  50,
  'Monster Rehab',
  458, 160, 20, 3,
  'Água, chá preto concentrado, suco de limão concentrado, eritritol, taurina (0,4%), cafeína (0,03%), extrato de guaraná, ácido cítrico, vitaminas (B3, B2, B6, B12), aromas naturais, sucralose, acesulfame K.',
  false, 0
),

-- Monster Java Mean Bean
(
  'Monster Java Mean Bean',
  'Café com creme e Monster Energy. Um blend irresistível de café colombiano com leite e a fórmula Monster — energia com sabor de café.',
  13.00,
  NULL,
  50,
  'Monster Java',
  443, 188, 200, 26,
  'Água, leite desnatado, açúcar, café concentrado, extrato de café, taurina (0,4%), cafeína (0,03%), extrato de guaraná, vitaminas (B3, B2, B6, B12), carragena, aromas naturais de baunilha e café.',
  false, 0
),

-- Monster Energy Bad Apple
(
  'Monster Energy Bad Apple',
  'Sabor intenso de maçã verde com um toque ácido. Energizante com aquela personalidade rebelde que só o Monster tem.',
  11.00,
  NULL,
  50,
  'Monster Juiced',
  473, 160, 210, 52,
  'Água gaseificada, sacarose, suco de maçã concentrado, ácido cítrico, taurina (0,4%), cafeína (0,03%), extrato de guaraná, vitaminas (B3, B2, B6, B12), aromas naturais de maçã verde, corante (E141).',
  false, 0
),

-- Monster Energy Doctor
(
  'Monster Energy Doctor',
  'O sabor único e misterioso que conquistou o mundo. Uma mistura inconfundível de 23 aromas que só o Monster Doctor tem.',
  9.90,
  NULL,
  50,
  'Monster Energy',
  473, 160, 200, 51,
  'Água gaseificada, sacarose, glicose, ácido cítrico, taurina (0,4%), cafeína (0,03%), extrato de guaraná, blend de aromas naturais e artificiais, vitaminas (B3, B2, B6, B12), corante caramelo.',
  false, 0
);
