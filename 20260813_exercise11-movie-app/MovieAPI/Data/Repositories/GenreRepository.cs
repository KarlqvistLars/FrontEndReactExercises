using Microsoft.EntityFrameworkCore;
using Movie_.Core.DomainContracts;
using Movie_.Core.Models;


namespace Movie_.Data.Repositories
{
    public class GenreRepository : IGenreRepository
    {
        private readonly Movie2APIContext _db;
        public GenreRepository(Movie2APIContext db)
        {
            _db = db;
        }
        async Task<IEnumerable<Genre>> IGenreRepository.GetAllAsync()
        {
            var genres = await _db.Genres
                .Include(g => g.Movies)
                .Select(g => new Genre {
                    GenreId = g.GenreId,
                    GenreName = g.GenreName
                }).AsSplitQuery()
                .ToListAsync();
            return genres;
        }
        async Task<Genre?> IGenreRepository.GetAsync(int id)
        {
            var genre = await _db.Genres
                .Include(g => g.Movies)
                .FirstOrDefaultAsync(g => g.GenreId == id) ?? null;

            if (genre == null) { return null; }

            return new Genre {
                GenreId = genre.GenreId,
                GenreName = genre.GenreName,
                Movies = genre.Movies!
                    .Select(m => new MovieClass {
                        MovieClassId = m.MovieClassId,
                        Title = m.Title,
                        Year = m.Year,
                        Duration = m.Duration
                    }).ToList()
            };
        }
        Task<bool> IGenreRepository.AnyAsync(int id)
        {
            throw new NotImplementedException();
        }
        void IGenreRepository.Add(Genre genre)
        {
            if (genre == null)
            {
                return;
            }
            _db.Genres.Add(genre);
        }
        void IGenreRepository.Update(Genre genre)
        {
            if (genre == null)
            {
                return;
            }
            _db.Genres.Update(genre);
        }
        void IGenreRepository.Remove(Genre genre)
        {
            if (genre == null)
            {
                return;
            }
            _db.Genres.Remove(genre);
        }
    }
}
