using Movie_.Core.Models;

namespace Movie_.Core
{
    public class GenreCreateDto
    {
        public int GenreId { get; set; }
        public string GenreName { get; set; } = string.Empty;
        // M:M till Movies genom MovieGenre
        public ICollection<Genre>? Genres { get; set; }
    }
}
