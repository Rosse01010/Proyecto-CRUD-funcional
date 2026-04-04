using SmartJourney.API.DTOs;

namespace SmartJourney.API.Services.Interfaces;

public interface ITransitLineService
{
    Task<IEnumerable<TransitLineResponseDto>> GetAllAsync();
    Task<TransitLineResponseDto?> GetByIdAsync(int id);
    Task<TransitLineResponseDto> CreateAsync(CreateTransitLineDto dto);
    Task<TransitLineResponseDto?> UpdateAsync(int id, UpdateTransitLineDto dto);
    Task<bool> DeleteAsync(int id);
}
