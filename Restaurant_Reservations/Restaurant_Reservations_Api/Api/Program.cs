using Api.Middleware;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ModelsDB.SystemUsers;
using RestaurantDB;
using System.Data;
using System.Text.Json.Serialization;
using ModelsDB;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.OpenApi.Models;
using Serilog;
using Application.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Application.CQRS.Customers;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    });

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    var jwtSecurityScheme = new OpenApiSecurityScheme
    {
        BearerFormat = "JWT",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = JwtBearerDefaults.AuthenticationScheme,
        Description = "Put Barer + your token in the box below",
        Reference = new OpenApiReference
        {
            Id = JwtBearerDefaults.AuthenticationScheme,
            Type = ReferenceType.SecurityScheme
        }
    };
    c.AddSecurityDefinition(jwtSecurityScheme.Reference.Id, jwtSecurityScheme);

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            jwtSecurityScheme, Array.Empty<string>()
        }
    });
});



builder.Services.AddDbContext<RestaurantContext>(opt =>
{
    opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddCors();
builder.Services.AddIdentityCore<User>(opt =>
{
    opt.User.RequireUniqueEmail = true;
    opt.Password.RequireDigit = true;
    opt.Password.RequireLowercase = true;
    opt.Password.RequireUppercase = true;
    opt.Password.RequireNonAlphanumeric = true;
    opt.Password.RequiredLength = 5;
})
    .AddRoles<Role>()
    .AddEntityFrameworkStores<RestaurantContext>()
    .AddDefaultTokenProviders();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(opt =>
    {
        opt.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.
                GetBytes(builder.Configuration["JWTSettings:TokenKey"]))
        };
    });
builder.Services.AddAuthorization();
builder.Services.AddScoped<TokenService>();

builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(
    typeof(CustomerList.Handler).Assembly
    ));

var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.ConfigObject.AdditionalItems.Add("persistAuthorization", "true");
    });
}

app.UseCors(opt =>
{
    opt.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("http://localhost:4000");
});

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

/// <summary>
/// Tworzy zakres dla uslug i inicjuje baze danych.
/// </summary>
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .CreateLogger();
var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();

try
{
    var context = services.GetRequiredService<RestaurantContext>();
    await context.Database.MigrateAsync();
    await Seed.SeedData(context, userManager);
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occured during migration");
}

app.Run();