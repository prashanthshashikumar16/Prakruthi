using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Doc_opr.Data;

namespace Doc_opr.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserSecurityController : ControllerBase
    {
        private readonly AuthDbContext _db;

        public UserSecurityController(AuthDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var data = await _db.UserSecurityStatuses.ToListAsync();
            return Ok(data);
        }
    }
}
