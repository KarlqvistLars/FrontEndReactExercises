using Movie_.Core.ModelDto;

namespace Movie_.Contracts
{
    public interface IGenreService
    {
        public Task<ICollection<GenreDto>> GetGenres();
    }
}