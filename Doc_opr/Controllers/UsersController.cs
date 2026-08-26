using Microsoft.AspNetCore.Mvc;
using Doc_opr.Data;
using Doc_opr.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;

namespace Doc_opr.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly AuthDbContext _db;
        public UsersController(AuthDbContext db)
        {
            _db = db;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegistrationDto model)
        {
            // Basic server-side validation
            var errors = new Dictionary<string, string>();
            if (string.IsNullOrWhiteSpace(model.FirstName)) errors["firstName"] = "Enter your first name.";
            if (string.IsNullOrWhiteSpace(model.LastName)) errors["lastName"] = "Enter your last name.";
            if (string.IsNullOrWhiteSpace(model.Email) || !Regex.IsMatch(model.Email, "^[^@\s]+@[^@\s]+\.[^@\s]+$", RegexOptions.IgnoreCase)) errors["email"] = "Enter a valid email address.";
            if (string.IsNullOrWhiteSpace(model.Username) || !Regex.IsMatch(model.Username, "^[a-zA-Z0-9._-]{3,100}$")) errors["username"] = "Use 3–100 letters, numbers, periods, underscores, or hyphens.";
            if (string.IsNullOrEmpty(model.Password) || model.Password.Length < 8 || model.Password.Length > 26 || !Regex.IsMatch(model.Password, "[a-z]") || !Regex.IsMatch(model.Password, "[A-Z]") || !Regex.IsMatch(model.Password, "\\d") || !Regex.IsMatch(model.Password, "[^A-Za-z0-9]"))
                errors["password"] = "Use 8–26 characters with upper/lowercase, a number, and a symbol.";
            if (model.Password != model.ConfirmPassword) errors["confirmPassword"] = "Passwords do not match.";

            if (errors.Count > 0)
            {
                return BadRequest(new { message = "Validation failed.", fieldErrors = errors });
            }

            // Call the DB function register_user
            var conn = _db.Database.GetDbConnection();
            await conn.OpenAsync();
            try
            {
                using var cmd = conn.CreateCommand();
                cmd.CommandText = "SELECT register_user(@username, @email, @firstName, @lastName, @password);";
                var p1 = cmd.CreateParameter(); p1.ParameterName = "@username"; p1.Value = model.Username; cmd.Parameters.Add(p1);
                var p2 = cmd.CreateParameter(); p2.ParameterName = "@email"; p2.Value = model.Email; cmd.Parameters.Add(p2);
                var p3 = cmd.CreateParameter(); p3.ParameterName = "@firstName"; p3.Value = model.FirstName; cmd.Parameters.Add(p3);
                var p4 = cmd.CreateParameter(); p4.ParameterName = "@lastName"; p4.Value = model.LastName; cmd.Parameters.Add(p4);
                var p5 = cmd.CreateParameter(); p5.ParameterName = "@password"; p5.Value = model.Password; cmd.Parameters.Add(p5);

                var result = await cmd.ExecuteScalarAsync();
                if (result == null)
                {
                    return StatusCode(500, new { message = "User registration failed." });
                }

                return CreatedAtAction(null, new { message = "Registration submitted. Check your email for verification instructions." });
            }
            catch (DbUpdateException ex)
            {
                // Unique constraint violation handling
                return BadRequest(new { message = "Could not register user.", details = ex.Message });
            }
            finally
            {
                await conn.CloseAsync();
            }
        }
    }
}
