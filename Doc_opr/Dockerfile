# Build stage
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# Copy csproj and restore
COPY ["Doc_opr.csproj", "./"]
RUN dotnet restore "Doc_opr.csproj"

# Copy everything else and publish
COPY . .
RUN dotnet publish "Doc_opr.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .

# Configure URLs to listen on both HTTP and HTTPS
ENV ASPNETCORE_URLS="https://+;http://+"
# By default the container expects a certificate at /https/aspnetapp.pfx when HTTPS is required.
# Set the following environment variables when running the container or in your orchestrator:
# - ASPNETCORE_Kestrel__Certificates__Default__Path=/https/aspnetapp.pfx
# - ASPNETCORE_Kestrel__Certificates__Default__Password=<pfx-password>

EXPOSE 80
EXPOSE 443

ENTRYPOINT ["dotnet", "Doc_opr.dll"]
