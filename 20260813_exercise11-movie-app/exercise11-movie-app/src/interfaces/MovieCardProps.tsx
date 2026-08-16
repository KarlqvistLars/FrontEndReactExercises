
export interface MovieCardProps {
    movieId: string;
    title: string;
    year: number;
    duration: number;
    details: MovieDetails;
    genres: Genre[];
    actors: Actor[];
    reviews: Review[];
    isOpen: boolean;
    onClick: () => void;
}

export interface MovieDetails {
    synopsis: string;
    language: string;
    budget: string;
    urlMoviePic: string;
}

export interface Genre {
    genreId: number;
    genreName: string;
}

export interface Actor {
    name: string;
    birthYear: string;
    role: string;
}

export interface Review {
    reviewer: string;
    comment: string;
    rating: number;
}

export interface NewMovie {
    movieId: string;
    title: string;
    year: string;
    duration: string;
    details: MovieDetails;
    genres: Genre[];
    actors: Actor[];
    reviews: Review[];
}