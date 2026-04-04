using Microsoft.EntityFrameworkCore;
using SmartJourney.API.Models;

namespace SmartJourney.API.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<TransitLine> TransitLines { get; set; }
    public DbSet<VoyagePass> VoyagePasss { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<TransitLine>().Property(r => r.Price).HasColumnType("decimal(10,2)");
        modelBuilder.Entity<VoyagePass>().Property(t => t.Price).HasColumnType("decimal(10,2)");
    }
}
