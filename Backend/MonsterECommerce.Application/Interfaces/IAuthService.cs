namespace MonsterECommerce.Application.Interfaces
{
    public interface IAuthService
    {
        string GenerateToken(int userId, string email, string role);
        string HashPassword(string password);
        bool VerifyPassword(string password, string hashedPassword);
    }
}
