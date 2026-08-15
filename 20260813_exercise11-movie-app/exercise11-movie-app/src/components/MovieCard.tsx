import { Link } from 'react-router-dom';
import type { MovieCardProps } from '../interfaces/MovieCardProps';

const MovieCard = ({
    movieId,
    title,
    details,
    genres,
    year,
    duration,
    actors,
    reviews,
    isOpen,
    onClick,
}: MovieCardProps) => {
    return (
        <div className="movie-card" onClick={onClick} style={isOpen ? { backgroundColor: 'var(--accent)' } : { backgroundColor: 'var(--button-text)' }}>
            <div style={{ flex: 5, textAlign: 'left' }}>
                <h2>{title} ({year})</h2>
                <p><strong>Duration:</strong> {duration} minutes</p>
                <p><strong>Synopsis:</strong></p>
                <p className='bordered-box'>{details.synopsis}</p>
                <p><strong>Genres:</strong> {genres.map(genre => genre.genreName).join(', ')}</p>
                <span style={{ display: isOpen ? 'block' : 'none' }}>
                    <p><strong>Language:</strong> {details.language}</p>
                    <p><strong>Budget:</strong> {details.budget}</p>
                    <p><strong>Actors:</strong> {actors.map(actor => actor.name).join(', ')}</p>
                    <p style={{ paddingBottom: "10px" }}><strong>Reviews:</strong> {reviews.map(review => review.comment).join(', ')}</p>
                    <Link to={`/form?movieId=${movieId}`}>
                        <button>Open</button>
                    </Link>
                </span>
            </div>
            <div style={{ flex: 1 }}>
                <img src={details.urlMoviePic} alt={`${title} + ${details.urlMoviePic}`} />
            </div>
        </div>
    )
}

export default MovieCard;