using System;

namespace Doc_opr.Models
{
    public class UserSecurityStatus
    {
        public Guid UserId { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string AccountStatus { get; set; } = string.Empty;
        public DateTimeOffset? EmailVerifiedAt { get; set; }
        public bool MfaEnabled { get; set; }
        public DateTimeOffset? LastLoginAt { get; set; }
        public DateTimeOffset? LastFailedLoginAt { get; set; }
        public int FailedLoginAttempts { get; set; }
        public DateTimeOffset? LockedAt { get; set; }
        public DateTimeOffset? LockedUntil { get; set; }
        public DateTimeOffset? PasswordCreatedAt { get; set; }
        public DateTimeOffset? PasswordUpdatedAt { get; set; }
        public int DaysSincePasswordUpdated { get; set; }
        public int DaysSincePasswordCreated { get; set; }
        public bool MustChangePassword { get; set; }
        public DateTimeOffset? PasswordExpiresAt { get; set; }
    }
}
