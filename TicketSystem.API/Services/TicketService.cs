using AutoMapper;
using Microsoft.EntityFrameworkCore;
using TicketSystem.API.Data;
using TicketSystem.API.DTOs;
using TicketSystem.API.Models;
using TicketSystem.API.Services.Interfaces;

namespace TicketSystem.API.Services;

public class TicketService : ITicketService
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;

    public TicketService(AppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<IEnumerable<TicketResponseDto>> GetAllAsync()
    {
        var tickets = await _context.Tickets
            .AsNoTracking()
            .Include(t => t.BusRoute)
            .OrderByDescending(t => t.IssuedAt)
            .ToListAsync();

        return _mapper.Map<IEnumerable<TicketResponseDto>>(tickets);
    }

    public async Task<TicketResponseDto?> GetByIdAsync(int id)
    {
        var ticket = await _context.Tickets
            .AsNoTracking()
            .Include(t => t.BusRoute)
            .FirstOrDefaultAsync(t => t.Id == id);

        return ticket is null ? null : _mapper.Map<TicketResponseDto>(ticket);
    }

    public async Task<TicketResponseDto?> CreateAsync(CreateTicketDto dto)
    {
        var route = await _context.BusRoutes.FindAsync(dto.BusRouteId);
        if (route is null) return null;

        var ticket = new Ticket
        {
            ValidationCode = Guid.NewGuid().ToString(),
            BusRouteId = dto.BusRouteId,
            PassengerName = dto.PassengerName,
            PassengerDocument = dto.PassengerDocument,
            IssuedAt = DateTime.UtcNow,
            TravelDate = dto.TravelDate.Date,
            Price = route.Price,
            Status = "Active"
        };

        _context.Tickets.Add(ticket);
        await _context.SaveChangesAsync();

        ticket.BusRoute = route;
        return _mapper.Map<TicketResponseDto>(ticket);
    }

    public async Task<TicketResponseDto?> UpdateStatusAsync(int id, string status)
    {
        var ticket = await _context.Tickets
            .Include(t => t.BusRoute)
            .FirstOrDefaultAsync(t => t.Id == id);

        if (ticket is null) return null;

        ticket.Status = status;
        await _context.SaveChangesAsync();
        return _mapper.Map<TicketResponseDto>(ticket);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var ticket = await _context.Tickets.FindAsync(id);
        if (ticket is null) return false;

        _context.Tickets.Remove(ticket);
        await _context.SaveChangesAsync();
        return true;
    }
}
