using Microsoft.AspNetCore.Mvc;
using SmartJourney.API.DTOs;
using SmartJourney.API.Services.Interfaces;

namespace SmartJourney.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class VoyagePassesController : ControllerBase
{
    private readonly IVoyagePassService _service;

    public VoyagePassesController(IVoyagePassService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
        => Ok(await _service.GetAllAsync());

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var result = await _service.GetByIdAsync(id);
        return result is null ? NotFound() : Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateVoyagePassDto dto)
    {
        var result = await _service.CreateAsync(dto);
        return result is null
            ? BadRequest(new { message = "Ruta no encontrada." })
            : CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
    }

    [HttpPatch("{id}/status")]
    public async Task<IActionResult> UpdateStatus(int id, [FromBody] string status)
    {
        var result = await _service.UpdateStatusAsync(id, status);
        return result is null ? NotFound() : Ok(result);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _service.DeleteAsync(id);
        return deleted ? NoContent() : NotFound();
    }
}
