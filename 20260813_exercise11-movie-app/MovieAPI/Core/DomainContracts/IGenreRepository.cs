using Movie_.Core.Models;

namespace Movie_.Core.DomainContracts
{
    public interface IGenreRepository
    {
        Task<IEnumerable<Genre>> GetAllAsync();
        Task<Genre?> GetAsync(int id);
        Task<bool> AnyAsync(int id);
        void Add(Genre genre);
        void Update(Genre genre);
        void Remove(Genre genre);
    }
}
