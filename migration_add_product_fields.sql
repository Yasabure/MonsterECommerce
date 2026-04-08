-- ============================================================
--  Migração: Adicionar novos campos na tabela Products
--  Execute este script no PostgreSQL do projeto
-- ============================================================

ALTER TABLE "Products"
  ADD COLUMN IF NOT EXISTS "DiscountPercentage" INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS "PackSize"           INTEGER,
  ADD COLUMN IF NOT EXISTS "CaffeineMg"         INTEGER,
  ADD COLUMN IF NOT EXISTS "CaloriesKcal"       INTEGER,
  ADD COLUMN IF NOT EXISTS "SugarG"             INTEGER,
  ADD COLUMN IF NOT EXISTS "VolumeMl"           INTEGER,
  ADD COLUMN IF NOT EXISTS "Ingredients"        TEXT;

-- Exemplos de uso após a migração:
--
-- Marcar produto como promoção (20% off, pack de 8 latas):
-- UPDATE "Products" SET "DiscountPercentage" = 20, "PackSize" = 8 WHERE "Name" ILIKE '%original%';
--
-- Preencher informações nutricionais:
-- UPDATE "Products" SET "CaffeineMg" = 160, "CaloriesKcal" = 210, "SugarG" = 54, "VolumeMl" = 473
-- WHERE "Name" ILIKE '%original%';
