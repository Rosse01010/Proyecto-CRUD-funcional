namespace TicketSystem.API.Models;

public class BusRoute
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Origin { get; set; } = string.Empty;
    public string Destination { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public bool IsActive { get; set; } = true;
    public ICollection<Ticket> Tickets { get; set; } = new List<Ticket>();
}
