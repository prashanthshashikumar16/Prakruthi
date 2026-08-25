using Microsoft.EntityFrameworkCore;
using Doc_opr.Models;

namespace Doc_opr.Data
{
    public class AuthDbContext : DbContext
    {
        public AuthDbContext(DbContextOptions<AuthDbContext> options) : base(options)
        {
        }

        public DbSet<UserSecurityStatus> UserSecurityStatuses { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Map to the database view and mark as read-only
            modelBuilder.Entity<UserSecurityStatus>().HasNoKey().ToView("user_security_status");

            base.OnModelCreating(modelBuilder);
        }
    }
}
