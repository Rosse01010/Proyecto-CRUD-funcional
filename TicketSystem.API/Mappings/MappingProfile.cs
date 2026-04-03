using AutoMapper;
using SmartJourney.API.DTOs;
using SmartJourney.API.Models;

namespace SmartJourney.API.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        // TransitLine
        CreateMap<TransitLine, TransitLineResponseDto>();
        CreateMap<CreateTransitLineDto, TransitLine>();
        CreateMap<UpdateTransitLineDto, TransitLine>();

        // VoyagePass — los campos generados (ValidationCode, Price, IssuedAt, Status)
        // son responsabilidad del servicio, no del mapping
        CreateMap<VoyagePass, VoyagePassResponseDto>();
    }
}
