using TicketSystem.API.DTOs;

namespace TicketSystem.API.Services.Interfaces;

public interface ITicketService
{
    Task<IEnumerable<TicketResponseDto>> GetAllAsync();
    Task<TicketResponseDto?> GetByIdAsync(int id);
    Task<TicketResponseDto?> CreateAsync(CreateTicketDto dto);
    Task<TicketResponseDto?> UpdateStatusAsync(int id, string status);
    Task<bool> DeleteAsync(int id);
}
