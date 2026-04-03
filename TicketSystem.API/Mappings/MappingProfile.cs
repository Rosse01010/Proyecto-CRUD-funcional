using AutoMapper;
using TicketSystem.API.DTOs;
using TicketSystem.API.Models;

namespace TicketSystem.API.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        // BusRoute
        CreateMap<BusRoute, BusRouteResponseDto>();
        CreateMap<CreateBusRouteDto, BusRoute>();
        CreateMap<UpdateBusRouteDto, BusRoute>();

        // Ticket — los campos generados (ValidationCode, Price, IssuedAt, Status)
        // son responsabilidad del servicio, no del mapping
        CreateMap<Ticket, TicketResponseDto>();
    }
}
