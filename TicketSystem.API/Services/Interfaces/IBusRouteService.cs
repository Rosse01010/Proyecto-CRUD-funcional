using TicketSystem.API.DTOs;

namespace TicketSystem.API.Services.Interfaces;

public interface IBusRouteService
{
    Task<IEnumerable<BusRouteResponseDto>> GetAllAsync();
    Task<BusRouteResponseDto?> GetByIdAsync(int id);
    Task<BusRouteResponseDto> CreateAsync(CreateBusRouteDto dto);
    Task<BusRouteResponseDto?> UpdateAsync(int id, UpdateBusRouteDto dto);
    Task<bool> DeleteAsync(int id);
}
