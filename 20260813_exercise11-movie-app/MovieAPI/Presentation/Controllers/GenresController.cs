using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using Movie_.Contracts;
using Movie_.Core;
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

    [HttpGet("{genreId}")]
    [ApiVersion("1.0")]
    [ApiVersion("2.0")]
    public async Task<ActionResult<GenreDto>> GetGenre(int genreId)
    {
        var genre = await _genreService.GetGenre(genreId);
        if (genre == null)
        {
            return NotFound();
        }
        return Ok(genre);
    }

    // POST: api/genres
    /// <summary>
    /// Skapar en ny skådespelare.
    /// </summary>
    /// <param name="actor">Skådespelaren som ska skapas.</param>
    /// <returns>Status och den skapade skådespelaren.</returns>
    [HttpPost]
    [ApiVersion("1.0")]
    [ApiVersion("2.0")]
    public async Task<ActionResult<GenreDto>> PostGenre(GenreCreateDto genre)
    {
        var result = await _genreService.PostGenre(genre);
        return CreatedAtAction(nameof(GetGenre), new { genreId = result.Value?.GenreId }, result.Value);
    }
}
