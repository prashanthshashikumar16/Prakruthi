using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Doc_opr.Migrations
{
    /// <summary>
    /// Manual EF Core migration to add email verification columns to the app_user table.
    /// Run with: dotnet ef database update --project Doc_opr --startup-project Doc_opr
    /// </summary>
    public partial class AddEmailVerificationColumns : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "email_verification_token_hash",
                table: "app_user",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "email_verification_expires_at",
                table: "app_user",
                type: "timestamptz",
                nullable: true);

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "email_verification_sent_at",
                table: "app_user",
                type: "timestamptz",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "email_verification_token_hash",
                table: "app_user");

            migrationBuilder.DropColumn(
                name: "email_verification_expires_at",
                table: "app_user");

            migrationBuilder.DropColumn(
                name: "email_verification_sent_at",
                table: "app_user");
        }
    }
}
