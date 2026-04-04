namespace SmartJourney.API.DTOs;

public class CreateVoyagePassDto
{
    public int TransitLineId { get; set; }
    public string PassengerName { get; set; } = string.Empty;
    public string PassengerDocument { get; set; } = string.Empty;
    public DateTime TravelDate { get; set; }
}
