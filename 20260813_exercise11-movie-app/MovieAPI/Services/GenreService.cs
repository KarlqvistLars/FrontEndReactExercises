using Microsoft.AspNetCore.Mvc;
using Movie_.Contracts;
using Movie_.Core;
using Movie_.Core.DomainContracts;
using Movie_.Core.ModelDto;
using Movie_.Core.Models;

namespace Movie_.Services
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

        public async Task<GenreDto> GetGenre(int genreId)
        {
            var genre = await _genreRepository.GetAsync(genreId);

            if (genre == null) { return null; }

            return new GenreDto {
                GenreId = genre.GenreId,
                GenreName = genre.GenreName,
            };
        }

        public async Task<ActionResult<GenreDto>> PostGenre(GenreCreateDto genreDto)
        {
            if (genreDto == null)
            {
                throw new ArgumentNullException(nameof(genreDto));
            }
            var genre = new Genre {
                GenreId = genreDto.GenreId,
                GenreName = genreDto.GenreName,
            };
            _genreRepository.Add(genre);
            return new GenreDto {
                GenreId = genre.GenreId,
                GenreName = genre.GenreName
            };
        }
    }
}
