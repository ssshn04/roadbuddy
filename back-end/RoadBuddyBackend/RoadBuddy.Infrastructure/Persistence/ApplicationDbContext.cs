using Microsoft.EntityFrameworkCore;
using RoadBuddy.Domain.Entities;

namespace RoadBuddy.Infrastructure.Persistence;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users => Set<User>();
    public DbSet<Vehicle> Vehicles => Set<Vehicle>();
    public DbSet<BorderPoint> BorderPoints => Set<BorderPoint>();
    public DbSet<QueueEntry> QueueEntries => Set<QueueEntry>();
    public DbSet<FuelStation> FuelStations => Set<FuelStation>();
    public DbSet<FuelPrice> FuelPrices => Set<FuelPrice>();
    public DbSet<Review> Reviews => Set<Review>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Для enum FuelType
        modelBuilder.Entity<FuelPrice>()
            .Property(p => p.FuelType)
            .HasConversion<string>();
        // Для enum UserRoles
        modelBuilder.Entity<User>()
        .Property(u => u.Role)
        .HasConversion<string>();
    }
}
