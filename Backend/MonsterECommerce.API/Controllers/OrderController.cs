using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MonsterECommerce.Application.Interfaces;

namespace MonsterECommerce.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        private int GetUserId() => int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

        [HttpPost("checkout")]
        public async Task<IActionResult> Checkout([FromQuery] string paymentMethod = "CreditCard")
        {
            var order = await _orderService.PlaceOrderAsync(GetUserId(), paymentMethod);
            if (order == null) return BadRequest(new { message = "Carrinho vazio ou quantidade solicitada excede o estoque disponível." });
            return Ok(order);
        }

        [HttpGet("my-orders")]
        public async Task<IActionResult> GetMyOrders() => Ok(await _orderService.GetUserOrdersAsync(GetUserId()));

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var order = await _orderService.GetOrderByIdAsync(GetUserId(), id);
            if (order == null) return NotFound();
            return Ok(order);
        }
    }
}
