namespace SmartJourney.API.DTOs;

public class VoyagePassResponseDto
{
    public int Id { get; set; }
    public string ValidationCode { get; set; } = string.Empty;
    public int TransitLineId { get; set; }
    public TransitLineResponseDto TransitLine { get; set; } = null!;
    public string PassengerName { get; set; } = string.Empty;
    public string PassengerDocument { get; set; } = string.Empty;
    public DateTime IssuedAt { get; set; }
    public DateTime TravelDate { get; set; }
    public decimal Price { get; set; }
    public string Status { get; set; } = string.Empty;
}
