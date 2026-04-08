using System.Net;
using System.Net.Mail;
using Microsoft.Extensions.Configuration;
using MonsterECommerce.Application.Interfaces;

namespace MonsterECommerce.Infrastructure.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _config;

        public EmailService(IConfiguration config)
        {
            _config = config;
        }

        public async Task SendVerificationCodeAsync(string to, string code, string type)
        {
            var subject = type == "Register"
                ? "Monster Store — Código de verificação"
                : "Monster Store — Redefinição de senha";

            var body = $@"<div style='font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px;background:#111;border-radius:12px;'>
                            <h2 style='color:#84bd00;margin-bottom:8px;'>Monster Store</h2>
                            <p style='color:#fff;'>{(type == "Register" ? "Seu código para criar a conta:" : "Seu código para redefinir a senha:")}</p>
                            <div style='font-size:36px;font-weight:bold;letter-spacing:8px;color:#84bd00;padding:16px;background:#1a1a1a;border-radius:8px;text-align:center;'>{code}</div>
                            <p style='color:#aaa;font-size:13px;margin-top:16px;'>Válido por 15 minutos. Ignore se não foi você.</p>
                          </div>";

            var host     = _config["Smtp:Host"]     ?? "sandbox.smtp.mailtrap.io";
            var port     = int.Parse(_config["Smtp:Port"] ?? "2525");
            var username = _config["Smtp:Username"] ?? throw new InvalidOperationException("Smtp:Username não configurado.");
            var password = _config["Smtp:Password"] ?? throw new InvalidOperationException("Smtp:Password não configurado.");
            var from     = _config["Smtp:From"]     ?? "noreply@monsterstore.com";
            var fromName = _config["Smtp:FromName"] ?? "Monster Store";

            using var client = new SmtpClient(host, port)
            {
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(username, password),
                EnableSsl = true
            };

            var message = new MailMessage
            {
                From       = new MailAddress(from, fromName),
                Subject    = subject,
                Body       = body,
                IsBodyHtml = true
            };
            message.To.Add(to);

            await client.SendMailAsync(message);
        }
    }
}
