namespace SmartJourney.API.Models;

public class VoyagePass
{
    public int Id { get; set; }
    public string ValidationCode { get; set; } = Guid.NewGuid().ToString();
    public int TransitLineId { get; set; }
    public TransitLine TransitLine { get; set; } = null!;
    public string PassengerName { get; set; } = string.Empty;
    public string PassengerDocument { get; set; } = string.Empty;
    public DateTime IssuedAt { get; set; } = DateTime.UtcNow;
    public DateTime TravelDate { get; set; }
    public decimal Price { get; set; }
    public string Status { get; set; } = "Active"; // Active, Used, Cancelled
}
