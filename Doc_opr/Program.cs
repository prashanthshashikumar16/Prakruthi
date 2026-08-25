using System.Security.Cryptography.X509Certificates;
using Microsoft.EntityFrameworkCore;
using Doc_opr.Data;

var builder = WebApplication.CreateBuilder(args);

// Configure Kestrel to use an HTTPS certificate when provided via configuration or environment variables.
// Expected environment variables (set when running the container):
// ASPNETCORE_Kestrel__Certificates__Default__Path -> path to .pfx file (e.g. /https/aspnetapp.pfx)
// ASPNETCORE_Kestrel__Certificates__Default__Password -> password for the .pfx file
builder.WebHost.ConfigureKestrel((context, options) =>
{
    var config = context.Configuration;
    var certPath = config["Kestrel:Certificates:Default:Path"] ?? Environment.GetEnvironmentVariable("ASPNETCORE_Kestrel__Certificates__Default__Path");
    var certPassword = config["Kestrel:Certificates:Default:Password"] ?? Environment.GetEnvironmentVariable("ASPNETCORE_Kestrel__Certificates__Default__Password");

    // Always listen on HTTP
    options.ListenAnyIP(80);

    if (!string.IsNullOrEmpty(certPath))
    {
        try
        {
            var cert = new X509Certificate2(certPath, certPassword);
            options.ListenAnyIP(443, listenOptions => listenOptions.UseHttps(cert));
        }
        catch
        {
            // If certificate loading fails, fall back to HTTP only.
        }
    }
});

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApi();

// Configure EF Core with Npgsql
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
if (!string.IsNullOrEmpty(connectionString))
{
    builder.Services.AddDbContext<AuthDbContext>(options => options.UseNpgsql(connectionString));
}

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// Only enable HTTPS redirection if an HTTPS certificate is configured (avoid redirect loops when running locally without a cert).
var httpsCertConfigured = !string.IsNullOrEmpty(builder.Configuration["Kestrel:Certificates:Default:Path"]) || !string.IsNullOrEmpty(Environment.GetEnvironmentVariable("ASPNETCORE_Kestrel__Certificates__Default__Path"));
if (httpsCertConfigured)
{
    app.UseHttpsRedirection();
}

// Serve static files from wwwroot (SPA assets)
app.UseDefaultFiles();
app.UseStaticFiles();

app.MapControllers();

// Fallback to index.html for SPA routes
app.MapFallbackToFile("index.html");

app.Run();
