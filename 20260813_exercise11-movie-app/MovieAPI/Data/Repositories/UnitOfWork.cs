using Movie_.Core.DomainContracts;

namespace Movie_.Data.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly Movie2APIContext _db;

        public UnitOfWork(Movie2APIContext db)
        {
            _db = db;
        }
        // TODO: Implement the repositories and CompleteAsync method in UnitOfWork class
        public IMovieRepository Movies => throw new NotImplementedException();

        public IReviewRepository Reviews => throw new NotImplementedException();

        public IActorRepository Actors => throw new NotImplementedException();

        public IGenreRepository Genres => throw new NotImplementedException();

        public Task CompleteAsync()
        {
            throw new NotImplementedException();
        }
    }
}
