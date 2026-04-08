-- Script de criação e seed para o banco de dados MonsterECommerce (PostgreSQL)

-- Nota: No PostgreSQL, o banco de dados deve ser criado separadamente antes de rodar o script
-- ou usando o comando CREATE DATABASE MonsterECommerceDb;

-- Criar tabela de produtos se não existir
CREATE TABLE IF NOT EXISTS "Products" (
    "Id" SERIAL PRIMARY KEY,
    "Name" VARCHAR(100) NOT NULL,
    "Description" TEXT,
    "Price" DECIMAL(18,2) NOT NULL,
    "ImageUrl" TEXT,
    "StockQuantity" INTEGER NOT NULL,
    "Category" VARCHAR(50)
);

-- Seed de produtos Monster
INSERT INTO "Products" ("Name", "Description", "Price", "ImageUrl", "StockQuantity", "Category")
VALUES
('Monster Energy Original', 'O clássico energético Monster com sabor único e marcante.', 9.90, 'https://images.tcdn.com.br/img/img_prod/739158/energetico_monster_energy_473ml_1033_1_20200525114708.jpg', 100, 'Monster Energy'),
('Monster Ultra Paradise', 'Sabor kiwi, lima e um toque de pepino. Sem açúcar.', 10.50, 'https://static.paodeacucar.com/img/uploads/1/617/12586617.jpg', 80, 'Monster Ultra'),
('Monster Mango Loco', 'Um blend exótico de sucos de frutas tropicais.', 11.00, 'https://static.paodeacucar.com/img/uploads/1/365/20223365.jpg', 60, 'Monster Juiced'),
('Monster Pipeline Punch', 'A mistura perfeita de maracujá, laranja e goiaba.', 11.00, 'https://static.paodeacucar.com/img/uploads/1/364/20223364.jpg', 70, 'Monster Juiced'),
('Monster Ultra Violet', 'Sabor uva refrescante e leve. Sem açúcar.', 10.50, 'https://static.paodeacucar.com/img/uploads/1/616/12586616.jpg', 90, 'Monster Ultra'),
('Monster Pacific Punch', 'Inspirado no clássico ponche de frutas.', 11.00, 'https://static.paodeacucar.com/img/uploads/1/159/23846159.jpg', 55, 'Monster Juiced')
ON CONFLICT DO NOTHING;
