import type { MovieCardProps } from '../interfaces/MovieCardProps';
import { useEffect, useRef, useState, type SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';

const MovieForm = () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("movieId");
    const url = `https://localhost:7221/api/v2/movies/${id}`;

    const [movie, setMovie] = useState<MovieCardProps | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [deleteSure, setDeleteSure] = useState(false);
    const dialogRef = useRef<HTMLDialogElement>(null);


    useEffect(() => {
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Kunde inte hämta filmen");
                }

                return response.json();
            })
            .then((data) => setMovie(data))
            .catch((error) => console.error(error));
    }, [url]);


    useEffect(() => {
        const dialog = dialogRef.current;

        if (!dialog) return;

        if (deleteSure && !dialog.open) {
            dialog.showModal();
        } else if (!deleteSure && dialog.open) {
            dialog.close();
        }
    }, [deleteSure]);


    const updateMovieField = (
        field: "title" | "year" | "duration",
        value: string
    ) => {
        setMovie((currentMovie) => {
            if (!currentMovie) return currentMovie;

            return {
                ...currentMovie,
                [field]: value,
            };
        });
    };

    const updateDetailsField = (
        field: "synopsis" | "language" | "budget" | "urlMoviePic",
        value: string
    ) => {
        setMovie((currentMovie) => {
            if (!currentMovie) return currentMovie;

            return {
                ...currentMovie,
                details: {
                    ...currentMovie.details,
                    [field]: value,
                },
            };
        });
    };


    const handleSubmit = async (
        event: SyntheticEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        // Första klicket gör formuläret redigerbart
        if (!isEditing) {
            setIsEditing(true);
            return;
        }

        if (!movie) return;

        // Andra klicket uppdaterar filmen
        try {
            setIsSaving(true);

            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(movie),
            });
            console.log("Movie to be updated:", JSON.stringify(movie.title));

            if (!response.ok) {
                throw new Error("Kunde inte uppdatera filmen");
            }

            // Använd detta om API:t returnerar den uppdaterade filmen:
            // const updatedMovie = await response.json();
            // setMovie(updatedMovie);

            setIsEditing(false);
        } catch (error) {
            console.error(error);
        } finally {
            setIsSaving(false);
        }
    };

    if (!movie) {
        return <p>Laddar filmen...</p>;
    }



    const handleDelete = async () => {
        if (!movie) return;
        try {
            const response = await fetch(url, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Kunde inte ta bort filmen");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="movie-form">
                <form onSubmit={handleSubmit} style={!isEditing ? { backgroundColor: 'var(--button-text)' } : { backgroundColor: 'var(--accent)' }}>
                    <span>
                        <h2>{movie?.title}</h2>
                        <p>Titel:</p>
                        <input type="text" placeholder="Title" value={movie?.title}
                            disabled={!isEditing}
                            onChange={(e) => updateMovieField("title", e.target.value)}
                        />
                        <p>År:</p>
                        <input type="text" placeholder="Year" value={movie?.year}
                            disabled={!isEditing}
                            onChange={(e) => updateMovieField("year", e.target.value)}
                        />
                        <p>Speltid:</p>
                        <input type="text" placeholder="Duration" value={movie?.duration} disabled={!isEditing}
                            onChange={(e) => updateMovieField("duration", e.target.value)}
                        />
                        <p>Synopsis:</p>
                        <textarea style={{ height: "200px", resize: "none" }} placeholder="Synopsis" value={movie?.details.synopsis} disabled={!isEditing}
                            onChange={(e) => updateDetailsField("synopsis", e.target.value)}
                        />
                        <p>Språk:</p>
                        <input type="text" placeholder="Language" value={movie?.details.language} disabled={!isEditing}
                            onChange={(e) => updateDetailsField("language", e.target.value)}
                        />
                        <p>Budget:</p>
                        <input type="text" placeholder="Budget" value={movie?.details.budget} disabled={!isEditing}
                            onChange={(e) => updateDetailsField("budget", e.target.value)}
                        />
                        <p>URL Film Bild:</p>
                        <input type="text" placeholder="URL Movie Pic" value={movie?.details.urlMoviePic} disabled={!isEditing}
                            onChange={(e) => updateDetailsField("urlMoviePic", e.target.value)}
                        />
                    </span>
                    <span>
                        <img src={movie?.details.urlMoviePic} alt={movie?.title} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                        <div style={{ display: "flex", justifyContent: "space-evenly", marginTop: "10px" }}>
                            <Link to="/"><button type="button">Tillbaka</button></Link>
                            <button type="submit" disabled={isSaving}>
                                {isSaving
                                    ? "Uppdaterar..."
                                    : isEditing
                                        ? "Update"
                                        : "Edit"}
                            </button>
                            <button type="button" onClick={() => setDeleteSure(true)}>Ta bort</button>
                            {deleteSure && (
                                <dialog
                                    ref={dialogRef}
                                    className="dialog"
                                >
                                    <p>Är du säker på att du vill ta bort filmen?</p>
                                    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                                        <button
                                            type="button"
                                            onClick={async () => {
                                                await handleDelete();
                                                setDeleteSure(false);
                                                window.location.href = "/";
                                            }}
                                        >
                                            Ta bort
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setDeleteSure(false)}
                                        >
                                            Avbryt
                                        </button>
                                    </div>
                                </dialog>
                            )}
                        </div>
                    </span>
                </form>
            </div>
        </div>
    )
}

export default MovieForm;   