using Microsoft.AspNetCore.Mvc;
using Movie_.Core;
using Movie_.Core.ModelDto;

namespace Movie_.Contracts
{
    public interface IGenreService
    {
        public Task<ICollection<GenreDto>> GetGenres();
        public Task<GenreDto> GetGenre(int genreId);
        public Task<ActionResult<GenreDto>> PostGenre(GenreCreateDto genreDto);
    }
}