using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SmartJourney.API.Data;
using SmartJourney.API.DTOs;
using SmartJourney.API.Models;
using SmartJourney.API.Services.Interfaces;

namespace SmartJourney.API.Services;

public class VoyagePassService : IVoyagePassService
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;

    public VoyagePassService(AppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<IEnumerable<VoyagePassResponseDto>> GetAllAsync()
    {
        var voyagePasses = await _context.VoyagePasss
            .AsNoTracking()
            .Include(t => t.TransitLine)
            .OrderByDescending(t => t.IssuedAt)
            .ToListAsync();

        return _mapper.Map<IEnumerable<VoyagePassResponseDto>>(voyagePasses);
    }

    public async Task<VoyagePassResponseDto?> GetByIdAsync(int id)
    {
        var voyage-pass = await _context.VoyagePasss
            .AsNoTracking()
            .Include(t => t.TransitLine)
            .FirstOrDefaultAsync(t => t.Id == id);

        return voyage-pass is null ? null : _mapper.Map<VoyagePassResponseDto>(voyage-pass);
    }

    public async Task<VoyagePassResponseDto?> CreateAsync(CreateVoyagePassDto dto)
    {
        var route = await _context.TransitLines.FindAsync(dto.TransitLineId);
        if (route is null) return null;

        var voyage-pass = new VoyagePass
        {
            ValidationCode = Guid.NewGuid().ToString(),
            TransitLineId = dto.TransitLineId,
            PassengerName = dto.PassengerName,
            PassengerDocument = dto.PassengerDocument,
            IssuedAt = DateTime.UtcNow,
            TravelDate = dto.TravelDate.Date,
            Price = route.Price,
            Status = "Active"
        };

        _context.VoyagePasss.Add(voyage-pass);
        await _context.SaveChangesAsync();

        voyage-pass.TransitLine = route;
        return _mapper.Map<VoyagePassResponseDto>(voyage-pass);
    }

    public async Task<VoyagePassResponseDto?> UpdateStatusAsync(int id, string status)
    {
        var voyage-pass = await _context.VoyagePasss
            .Include(t => t.TransitLine)
            .FirstOrDefaultAsync(t => t.Id == id);

        if (voyage-pass is null) return null;

        voyage-pass.Status = status;
        await _context.SaveChangesAsync();
        return _mapper.Map<VoyagePassResponseDto>(voyage-pass);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var voyage-pass = await _context.VoyagePasss.FindAsync(id);
        if (voyage-pass is null) return false;

        _context.VoyagePasss.Remove(voyage-pass);
        await _context.SaveChangesAsync();
        return true;
    }
}
