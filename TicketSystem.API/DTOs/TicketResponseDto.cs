namespace TicketSystem.API.DTOs;

public class TicketResponseDto
{
    public int Id { get; set; }
    public string ValidationCode { get; set; } = string.Empty;
    public int BusRouteId { get; set; }
    public BusRouteResponseDto BusRoute { get; set; } = null!;
    public string PassengerName { get; set; } = string.Empty;
    public string PassengerDocument { get; set; } = string.Empty;
    public DateTime IssuedAt { get; set; }
    public DateTime TravelDate { get; set; }
    public decimal Price { get; set; }
    public string Status { get; set; } = string.Empty;
}
