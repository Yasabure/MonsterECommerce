using FluentValidation;
using MonsterECommerce.Application.DTOs;

namespace MonsterECommerce.Application.Validators
{
    public class RegisterDtoValidator : AbstractValidator<RegisterDto>
    {
        public RegisterDtoValidator()
        {
            RuleFor(x => x.Name).NotEmpty().WithMessage("Nome é obrigatório.");
            RuleFor(x => x.Email).NotEmpty().EmailAddress().WithMessage("E-mail inválido.");
            RuleFor(x => x.Password).NotEmpty().MinimumLength(6).WithMessage("Senha deve ter no mínimo 6 caracteres.");
        }
    }

    public class LoginDtoValidator : AbstractValidator<LoginDto>
    {
        public LoginDtoValidator()
        {
            RuleFor(x => x.Email).NotEmpty().EmailAddress().WithMessage("E-mail inválido.");
            RuleFor(x => x.Password).NotEmpty().WithMessage("Senha é obrigatória.");
        }
    }
}
