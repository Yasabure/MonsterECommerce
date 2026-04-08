using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MonsterECommerce.Application.DTOs;
using MonsterECommerce.Application.Interfaces;

namespace MonsterECommerce.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;

        public AuthController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            var response = await _userService.AuthenticateAsync(loginDto);
            if (response == null)
                return Unauthorized(new { message = "Email ou senha incorretos." });
            return Ok(response);
        }

        [HttpPost("send-code")]
        public async Task<IActionResult> SendCode([FromBody] SendCodeDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Email))
                return BadRequest(new { message = "E-mail inválido." });
            await _userService.SendVerificationCodeAsync(dto.Email, dto.Type);
            return Ok(new { message = "Código enviado para o e-mail." });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterWithCodeDto dto)
        {
            var response = await _userService.RegisterAsync(dto);
            if (response == null)
                return BadRequest(new { message = "Código inválido, expirado ou e-mail já cadastrado." });
            return Ok(response);
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDto dto)
        {
            var success = await _userService.ResetPasswordAsync(dto);
            if (!success)
                return BadRequest(new { message = "Código inválido ou expirado." });
            return Ok(new { message = "Senha redefinida com sucesso." });
        }
    }
}
