-- ============================================================
--  Atualização: Informações nutricionais e descrições reais
--  Todos os produtos são latas de 473ml (16 fl oz)
-- ============================================================

-- 1. Monster Energy Original
UPDATE "Products" SET
  "Description"  = 'O clássico energético Monster. Sabor marcante com blend único de cafeína, taurina, B-vitaminas e extrato de guaraná.',
  "VolumeMl"     = 473,
  "CaffeineMg"   = 160,
  "CaloriesKcal" = 210,
  "SugarG"       = 54,
  "Ingredients"  = 'Água gaseificada, sacarose, glicose, suco de limão concentrado, taurina (0,4%), ácido cítrico, cafeína (0,03%), extrato de guaraná, vitaminas (niacinamida B3, riboflavina B2, piridoxina B6, cianocobalamina B12), corante caramelo, aroma natural.'
WHERE "Id" = 1;

-- 2. Monster Ultra Paradise
UPDATE "Products" SET
  "Description"  = 'Sabor refrescante de kiwi, lima e pepino. Zero açúcar, zero calorias — toda a energia sem culpa.',
  "VolumeMl"     = 473,
  "CaffeineMg"   = 150,
  "CaloriesKcal" = 10,
  "SugarG"       = 0,
  "Ingredients"  = 'Água gaseificada, eritritol, ácido cítrico, taurina (0,4%), cafeína (0,03%), extrato de guaraná, aromas naturais (kiwi, lima, pepino), vitaminas (B3, B2, B6, B12), sucralose, acesulfame K, corante (E133).'
WHERE "Id" = 2;

-- 3. Monster Mango Loco
UPDATE "Products" SET
  "Description"  = 'Blend exótico de sucos de frutas tropicais com toque de manga. Metade energético, metade suco de frutas.',
  "VolumeMl"     = 473,
  "CaffeineMg"   = 160,
  "CaloriesKcal" = 220,
  "SugarG"       = 53,
  "Ingredients"  = 'Água gaseificada, sacarose, suco de manga concentrado, suco de maracujá concentrado, ácido cítrico, taurina (0,4%), cafeína (0,03%), extrato de guaraná, vitaminas (B3, B2, B6, B12), aromas naturais de manga, corante (betacaroteno).'
WHERE "Id" = 3;

-- 4. Monster Pipeline Punch
UPDATE "Products" SET
  "Description"  = 'Mistura irresistível de maracujá, laranja e goiaba. Inspirado nas ondas do Havaí — doce, tropical e energizante.',
  "VolumeMl"     = 473,
  "CaffeineMg"   = 160,
  "CaloriesKcal" = 210,
  "SugarG"       = 52,
  "Ingredients"  = 'Água gaseificada, sacarose, suco de maracujá concentrado, suco de laranja concentrado, suco de goiaba concentrado, ácido cítrico, taurina (0,4%), cafeína (0,03%), extrato de guaraná, vitaminas (B3, B2, B6, B12), aromas naturais, corante (antocianinas).'
WHERE "Id" = 4;

-- 5. Monster Ultra Violet
UPDATE "Products" SET
  "Description"  = 'Sabor delicado de uva branca com toque cítrico. Zero açúcar, levíssimo e ultra refrescante.',
  "VolumeMl"     = 473,
  "CaffeineMg"   = 150,
  "CaloriesKcal" = 10,
  "SugarG"       = 0,
  "Ingredients"  = 'Água gaseificada, eritritol, ácido cítrico, taurina (0,4%), cafeína (0,03%), extrato de guaraná, aromas naturais de uva, vitaminas (B3, B2, B6, B12), sucralose, acesulfame K, corante (E163 antocianinas).'
WHERE "Id" = 5;

-- 6. Monster Pacific Punch
UPDATE "Products" SET
  "Description"  = 'Clássico ponche de frutas tropicais — uma explosão de maracujá, pêssego e laranja em cada gole.',
  "VolumeMl"     = 473,
  "CaffeineMg"   = 160,
  "CaloriesKcal" = 220,
  "SugarG"       = 53,
  "Ingredients"  = 'Água gaseificada, sacarose, suco de maracujá concentrado, suco de pêssego concentrado, suco de laranja concentrado, ácido cítrico, taurina (0,4%), cafeína (0,03%), extrato de guaraná, vitaminas (B3, B2, B6, B12), aromas naturais, corante (E160c).'
WHERE "Id" = 6;

-- 7. Monster Ultra Fiesta Mango
UPDATE "Products" SET
  "Description"  = 'Sabor tropical intenso de manga madura. Zero açúcar e zero calorias na versão Ultra da linha Fiesta.',
  "VolumeMl"     = 473,
  "CaffeineMg"   = 150,
  "CaloriesKcal" = 10,
  "SugarG"       = 0,
  "Ingredients"  = 'Água gaseificada, eritritol, ácido cítrico, taurina (0,4%), cafeína (0,03%), extrato de guaraná, aroma natural de manga, vitaminas (B3, B2, B6, B12), sucralose, acesulfame K, corante (betacaroteno).'
WHERE "Id" = 7;

-- 8. Monster Ultra Rosa
UPDATE "Products" SET
  "Description"  = 'Sabor delicado de toranja rosada com toque floral. Zero açúcar — refrescante, leve e inconfundível.',
  "VolumeMl"     = 473,
  "CaffeineMg"   = 150,
  "CaloriesKcal" = 10,
  "SugarG"       = 0,
  "Ingredients"  = 'Água gaseificada, eritritol, ácido cítrico, taurina (0,4%), cafeína (0,03%), extrato de guaraná, aroma natural de toranja rosada, vitaminas (B3, B2, B6, B12), sucralose, acesulfame K, corante (antocianinas).'
WHERE "Id" = 8;

-- 9. Monster Energy Ultra White
UPDATE "Products" SET
  "Description"  = 'Sabor cítrico suave com notas de limão e laranja. Zero açúcar — o Ultra White é o mais leve da linha clássica.',
  "VolumeMl"     = 473,
  "CaffeineMg"   = 150,
  "CaloriesKcal" = 10,
  "SugarG"       = 0,
  "Ingredients"  = 'Água gaseificada, eritritol, ácido cítrico, taurina (0,4%), cafeína (0,03%), extrato de guaraná, aromas naturais de limão e laranja, vitaminas (B3, B2, B6, B12), sucralose, acesulfame K.'
WHERE "Id" = 9;
