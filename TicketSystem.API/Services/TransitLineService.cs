using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SmartJourney.API.Data;
using SmartJourney.API.DTOs;
using SmartJourney.API.Models;
using SmartJourney.API.Services.Interfaces;

namespace SmartJourney.API.Services;

public class TransitLineService : ITransitLineService
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;

    public TransitLineService(AppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<IEnumerable<TransitLineResponseDto>> GetAllAsync()
    {
        var routes = await _context.TransitLines.AsNoTracking().ToListAsync();
        return _mapper.Map<IEnumerable<TransitLineResponseDto>>(routes);
    }

    public async Task<TransitLineResponseDto?> GetByIdAsync(int id)
    {
        var route = await _context.TransitLines.AsNoTracking()
            .FirstOrDefaultAsync(r => r.Id == id);

        return route is null ? null : _mapper.Map<TransitLineResponseDto>(route);
    }

    public async Task<TransitLineResponseDto> CreateAsync(CreateTransitLineDto dto)
    {
        var route = _mapper.Map<TransitLine>(dto);
        _context.TransitLines.Add(route);
        await _context.SaveChangesAsync();
        return _mapper.Map<TransitLineResponseDto>(route);
    }

    public async Task<TransitLineResponseDto?> UpdateAsync(int id, UpdateTransitLineDto dto)
    {
        var route = await _context.TransitLines.FindAsync(id);
        if (route is null) return null;

        _mapper.Map(dto, route);
        await _context.SaveChangesAsync();
        return _mapper.Map<TransitLineResponseDto>(route);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var route = await _context.TransitLines.FindAsync(id);
        if (route is null) return false;

        _context.TransitLines.Remove(route);
        await _context.SaveChangesAsync();
        return true;
    }
}
