using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MonsterECommerce.Application.DTOs;
using MonsterECommerce.Application.Interfaces;

namespace MonsterECommerce.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;
        private readonly IWebHostEnvironment _env;

        public ProductController(IProductService productService, IWebHostEnvironment env)
        {
            _productService = productService;
            _env = env;
        }

        // ── Public ──────────────────────────────────────────────────────

        [HttpGet]
        public async Task<IActionResult> GetAll() => Ok(await _productService.GetAllAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id) => Ok(await _productService.GetByIdAsync(id));

        [HttpGet("search")]
        public async Task<IActionResult> Search([FromQuery] string name) => Ok(await _productService.SearchAsync(name));

        // ── Admin CRUD ───────────────────────────────────────────────────

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] SaveProductDto dto)
        {
            var result = await _productService.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] SaveProductDto dto)
        {
            var result = await _productService.UpdateAsync(id, dto);
            if (result == null) return NotFound();
            return Ok(result);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _productService.DeleteAsync(id);
            if (!success) return NotFound();
            return NoContent();
        }

        // ── Image Upload (Admin) ─────────────────────────────────────────

        [Authorize(Roles = "Admin")]
        [HttpPost("upload-image")]
        public async Task<IActionResult> UploadImage(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest(new { message = "Nenhum arquivo enviado." });

            var allowed = new[] { ".jpg", ".jpeg", ".png", ".webp", ".gif" };
            var ext = Path.GetExtension(file.FileName).ToLowerInvariant();
            if (!allowed.Contains(ext))
                return BadRequest(new { message = "Formato não permitido. Use JPG, PNG, WEBP ou GIF." });

            var uploadsDir = Path.Combine(_env.WebRootPath ?? Path.Combine(Directory.GetCurrentDirectory(), "wwwroot"), "images");
            Directory.CreateDirectory(uploadsDir);

            var fileName = $"{System.Guid.NewGuid()}{ext}";
            var filePath = Path.Combine(uploadsDir, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
                await file.CopyToAsync(stream);

            var baseUrl = $"{Request.Scheme}://{Request.Host}";
            return Ok(new { imageUrl = $"{baseUrl}/images/{fileName}" });
        }
    }

    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class CartController : ControllerBase
    {
        private readonly ICartService _cartService;

        public CartController(ICartService cartService)
        {
            _cartService = cartService;
        }

        private int GetUserId() => int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

        [HttpGet]
        public async Task<IActionResult> Get() => Ok(await _cartService.GetByUserIdAsync(GetUserId()));

        [HttpPost("add")]
        public async Task<IActionResult> Add([FromQuery] int productId, [FromQuery] int quantity = 1)
        {
            await _cartService.AddToCartAsync(GetUserId(), productId, quantity);
            return Ok();
        }

        [HttpPut("update")]
        public async Task<IActionResult> Update([FromQuery] int productId, [FromQuery] int quantity)
        {
            await _cartService.UpdateQuantityAsync(GetUserId(), productId, quantity);
            return Ok();
        }

        [HttpDelete("remove/{productId}")]
        public async Task<IActionResult> Remove(int productId)
        {
            await _cartService.RemoveFromCartAsync(GetUserId(), productId);
            return Ok();
        }

        [HttpDelete("clear")]
        public async Task<IActionResult> Clear()
        {
            await _cartService.ClearCartAsync(GetUserId());
            return Ok();
        }
    }
}
