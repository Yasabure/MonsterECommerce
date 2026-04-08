using System;

namespace MonsterECommerce.Domain.Entities
{
    public class VerificationCode
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Code { get; set; }
        public string Type { get; set; } // "Register" | "PasswordReset"
        public DateTime ExpiresAt { get; set; }
        public bool Used { get; set; } = false;
    }
}
