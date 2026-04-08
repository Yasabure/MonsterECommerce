# Monster E-Commerce 🔋

Sistema de e-commerce funcional para venda de energéticos Monster, construído com .NET 8 e Angular.

## 🚀 Tecnologias Utilizadas

### Back-end
* C# / .NET 8
* ASP.NET Core Web API
* Entity Framework Core (**PostgreSQL**)
* Repository Pattern & Service Layer
* FluentValidation
* JWT Authentication
* BCrypt para hash de senhas

### Front-end
* Angular 17+ (Standalone Components)
* Bootstrap 5 & Bootstrap Icons
* TypeScript / RxJS

## 🛠️ Como Executar

### Pré-requisitos
* .NET 8 SDK
* Node.js & NPM (para o Front-end)
* **PostgreSQL** instalado e rodando

### 1. Banco de Dados
O projeto está configurado para usar o PostgreSQL.
1. Abra o arquivo `Backend/MonsterECommerce.API/appsettings.json` e ajuste a `DefaultConnection` com seu usuário e senha do Postgres.
2. Crie um banco de dados chamado `MonsterECommerceDb`.
3. Execute o script `Backend/seed.sql` no seu banco de dados para criar a tabela de produtos e popular os dados iniciais.
4. No terminal, na pasta `Backend`, você pode gerar as outras tabelas via migrations:
   ```bash
   dotnet ef database update --project MonsterECommerce.Infrastructure --startup-project MonsterECommerce.API
   ```

### 2. Back-end
1. Navegue até a pasta `Backend/MonsterECommerce.API`.
2. Execute o comando:
   ```bash
   dotnet run
   ```
3. A API estará disponível em `https://localhost:7082/swagger` (ou porta similar indicada no console).

### 3. Front-end
1. Navegue até a pasta `Frontend`.
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm start
   ```
4. Acesse `http://localhost:4200`.

## 📱 Funcionalidades
* **Login/Cadastro**: Autenticação segura com JWT.
* **Vitrine**: Listagem de produtos Monster com imagens reais.
* **Carrinho**: Adição, remoção e cálculo automático de total.
* **Checkout**: Resumo do pedido e finalização (pagamento simulado).
* **Segurança**: Rotas protegidas no Front e Back-end.

---
Desenvolvido como projeto completo de E-Commerce.
