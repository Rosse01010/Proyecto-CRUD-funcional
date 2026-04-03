using Microsoft.EntityFrameworkCore;
using TicketSystem.API.Models;

namespace TicketSystem.API.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<BusRoute> BusRoutes { get; set; }
    public DbSet<Ticket> Tickets { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<BusRoute>().Property(r => r.Price).HasColumnType("decimal(10,2)");
        modelBuilder.Entity<Ticket>().Property(t => t.Price).HasColumnType("decimal(10,2)");
    }
}
