namespace TicketSystem.API.DTOs;

public class CreateTicketDto
{
    public int BusRouteId { get; set; }
    public string PassengerName { get; set; } = string.Empty;
    public string PassengerDocument { get; set; } = string.Empty;
    public DateTime TravelDate { get; set; }
}
