namespace SmartJourney.API.Models;

public class TransitLine
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Origin { get; set; } = string.Empty;
    public string Destination { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public bool IsActive { get; set; } = true;
    public ICollection<VoyagePass> VoyagePasss { get; set; } = new List<VoyagePass>();
}
