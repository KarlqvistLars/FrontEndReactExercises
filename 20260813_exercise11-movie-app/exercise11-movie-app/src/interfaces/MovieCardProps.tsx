
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
    budget: number;
    urlMoviePic: string;
}

export interface Genre {
    genreName: string;
}

export interface Actor {
    name: string;
    age: number;
    role: string;
}

export interface Review {
    reviewer: string;
    comment: string;
    rating: number;
}