using BikeShop.API.Data;
using BikeShop.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BikeShop.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BikesController : ControllerBase
{
    private readonly BikeDbContext _context;

    public BikesController(BikeDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Bike>>> GetBikes()
    {
        return await _context.Bikes.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Bike>> GetBike(Guid id)
    {
        var bike = await _context.Bikes.FindAsync(id);

        if (bike == null)
        {
            return NotFound();
        }

        return bike;
    }

    [HttpPost]
    public async Task<ActionResult<Bike>> PostBike(Bike bike)
    {
        if (bike.Ref == Guid.Empty)
        {
            bike.Ref = Guid.NewGuid();
        }

        _context.Bikes.Add(bike);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetBike), new { id = bike.Ref }, bike);
    }
}