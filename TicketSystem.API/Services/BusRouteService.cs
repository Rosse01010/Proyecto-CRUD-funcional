using AutoMapper;
using Microsoft.EntityFrameworkCore;
using TicketSystem.API.Data;
using TicketSystem.API.DTOs;
using TicketSystem.API.Models;
using TicketSystem.API.Services.Interfaces;

namespace TicketSystem.API.Services;

public class BusRouteService : IBusRouteService
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;

    public BusRouteService(AppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<IEnumerable<BusRouteResponseDto>> GetAllAsync()
    {
        var routes = await _context.BusRoutes.AsNoTracking().ToListAsync();
        return _mapper.Map<IEnumerable<BusRouteResponseDto>>(routes);
    }

    public async Task<BusRouteResponseDto?> GetByIdAsync(int id)
    {
        var route = await _context.BusRoutes.AsNoTracking()
            .FirstOrDefaultAsync(r => r.Id == id);

        return route is null ? null : _mapper.Map<BusRouteResponseDto>(route);
    }

    public async Task<BusRouteResponseDto> CreateAsync(CreateBusRouteDto dto)
    {
        var route = _mapper.Map<BusRoute>(dto);
        _context.BusRoutes.Add(route);
        await _context.SaveChangesAsync();
        return _mapper.Map<BusRouteResponseDto>(route);
    }

    public async Task<BusRouteResponseDto?> UpdateAsync(int id, UpdateBusRouteDto dto)
    {
        var route = await _context.BusRoutes.FindAsync(id);
        if (route is null) return null;

        _mapper.Map(dto, route);
        await _context.SaveChangesAsync();
        return _mapper.Map<BusRouteResponseDto>(route);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var route = await _context.BusRoutes.FindAsync(id);
        if (route is null) return false;

        _context.BusRoutes.Remove(route);
        await _context.SaveChangesAsync();
        return true;
    }
}
