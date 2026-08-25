# Prakruthi

Prakruthi is a microservice + single-page app demo project. This repository contains:

- Doc_opr: ASP.NET Core Web API (NET 10) that serves a small React SPA from wwwroot and exposes a simple API.
- Database initialization SQL for PostgreSQL (Doc_opr/Database/init.sql).
- Dockerfile and docker-compose.yml to run the service and a Postgres database.
- GitHub Actions workflow (.github/workflows/validate-schema.yml) that validates the DB schema.

Quick start (with Docker):

1. Copy example secrets:
   - `cp .env.example .env`
   - `mkdir -p .secrets && cp Doc_opr/Secrets/*.example .secrets/`
2. Build and run the stack:
   ```bash
   docker compose up --build
   ```
3. Open the SPA in your browser: `http://localhost/` or `http://localhost:80`
4. Call the API: `GET http://localhost/api/usersecurity`

Local dev (no Docker):

1. Ensure .NET 10 SDK is installed.
2. Optionally run Postgres locally and set `ConnectionStrings__DefaultConnection` environment variable.
3. Run the API:
   ```powershell
   $env:ASPNETCORE_URLS = "http://localhost:5000"
   dotnet run --project Doc_opr
   ```

Security and secrets:
- Do not commit real secrets. Use `.secrets/` or your platform's secret manager.

Contributing
- See CONTRIBUTING.md for notes on making changes.

License
- This project is licensed under the MIT License - see LICENSE for details.
