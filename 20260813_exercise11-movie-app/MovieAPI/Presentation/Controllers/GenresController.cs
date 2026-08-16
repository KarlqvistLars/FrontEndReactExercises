using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using Movie_.Contracts;
using Movie_.Core.ModelDto;

namespace Movie_.Presentation.Controllers;
// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
/// <summary>
/// Controller för att hantera CRUD-operationer för skådespelare (Actors).
/// </summary>
[ApiController]
[ApiVersion("1.0")]
[ApiVersion("2.0")]
[Route("api/v{version:apiVersion}/[controller]")]
public class GenresController : ControllerBase
{
    private readonly IGenreService _genreService;

    public GenresController(IGenreService genreService)
    {
        _genreService = genreService;
    }

    // GET: api/genres
    /// <summary>
    /// Hämtar en lista över alla genrer.
    /// </summary>
    /// <returns>Status och en lista över genrer    .</returns>
    [HttpGet]
    [ApiVersion("1.0")]
    [ApiVersion("2.0")]
    public async Task<ActionResult<ICollection<GenreDto>>> GetGenres()
    {
        var genres = await _genreService.GetGenres();
        if (genres == null || !genres.Any())
        {
            return NotFound();
        }
        return Ok(genres);
    }
}
