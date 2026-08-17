using Movie_.Contracts;
using Movie_.Core.DomainContracts;
using Movie_.Core.ModelDto;

namespace Movie_.API.Services
{
    public class GenreService : IGenreService
    {
        private readonly IGenreRepository _genreRepository;
        public GenreService(IGenreRepository genreRepository)
        {
            _genreRepository = genreRepository;
        }
        public async Task<ICollection<GenreDto>> GetGenres()
        {
            var genres = await _genreRepository.GetAllAsync();
            return genres.Select(g => new GenreDto {
                GenreId = g.GenreId,
                GenreName = g.GenreName
            }).ToList();
        }
    }
}
