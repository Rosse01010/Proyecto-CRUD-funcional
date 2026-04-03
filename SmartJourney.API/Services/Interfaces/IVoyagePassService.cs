using SmartJourney.API.DTOs;

namespace SmartJourney.API.Services.Interfaces;

public interface IVoyagePassService
{
    Task<IEnumerable<VoyagePassResponseDto>> GetAllAsync();
    Task<VoyagePassResponseDto?> GetByIdAsync(int id);
    Task<VoyagePassResponseDto?> CreateAsync(CreateVoyagePassDto dto);
    Task<VoyagePassResponseDto?> UpdateStatusAsync(int id, string status);
    Task<bool> DeleteAsync(int id);
}
