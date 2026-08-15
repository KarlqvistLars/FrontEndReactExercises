import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import type { Actor, MovieDetails, Review } from '../interfaces/MovieCardProps';
import Header from './Header';

const url = 'https://localhost:7221/api/v2/movies';

const MovieList = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => setMovies(data));
    }, []);


    const [showDetails, setShowDetails] = useState<string | null>(null);

    const handleCardClick = (movieId: string) => {
        setShowDetails((currentId) => currentId === movieId ? null : movieId
        );
    };

    return (
        <>
            <div className="">
                <Header />
                <div style={{ translate: "0 110px" }}>
                    <ul>
                        {movies.map((movie: { movieId: string; title: string; year: number; duration: number; details: MovieDetails; genres: { genreName: string }[]; actors: Actor[]; reviews: Review[]; urlMoviePic: string }) => (
                            <MovieCard
                                key={movie.movieId}
                                {...movie}
                                isOpen={showDetails === movie.movieId}
                                onClick={() => handleCardClick(movie.movieId)}
                                movieId={movie.movieId}
                                title={movie.title}
                                duration={movie.duration}
                                details={{ ...movie.details }}
                                genres={movie.genres}
                                actors={movie.actors}
                                reviews={movie.reviews}
                                year={movie.year}
                            />
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default MovieList