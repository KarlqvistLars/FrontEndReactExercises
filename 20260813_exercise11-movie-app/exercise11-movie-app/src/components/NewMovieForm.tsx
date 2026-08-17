import type { NewMovie } from '../interfaces/MovieCardProps';
import { useEffect, useRef, useState, type SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';

const NewMovieForm = () => {

    // const params = new URLSearchParams(window.location.search);
    // const id = params.get("movieId");
    const url = `https://localhost:7221/api/v2/movies`;
    const genreUrl = `https://localhost:7221/api/v2/genres`;

    // const [movie, setMovie] = useState<MovieCardProps | null>(null);
    const [movie, setMovie] = useState<NewMovie>({
        movieId: "",
        title: "",
        year: new Date().getFullYear().toString(),
        duration: "0",
        details: {
            urlMoviePic: "",
            synopsis: "",
            language: "",
            budget: "0",
        },
        genres: [],
        actors: [],
        reviews: [],
    });

    const [isEditing, setIsEditing] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [deleteSure, setDeleteSure] = useState(false);
    const dialogRef = useRef<HTMLDialogElement>(null);


    const [genres, setGenres] = useState<{ genreId: number; genreName: string }[]>([]);

    useEffect(() => {
        fetch(genreUrl)
            .then(response => response.json())
            .then(data => setGenres(data));
    }, [genreUrl]);

    const genreMap: Record<number, string> = {
        ...Object.fromEntries(genres.map((genre) => [genre.genreId, genre.genreName])),
    };
    // useEffect(() => {
    //     fetch(url)
    //         .then((response) => {
    //             if (!response.ok) {
    //                 throw new Error("Kunde inte hämta filmen");
    //             }

    //             return response.json();
    //         })
    //         .then((data) => setMovie(data))
    //         .catch((error) => console.error(error));
    // }, [url]);


    // useEffect(() => {
    //     const dialog = dialogRef.current;

    //     if (!dialog) return;

    //     if (deleteSure && !dialog.open) {
    //         dialog.showModal();
    //     } else if (!deleteSure && dialog.open) {
    //         dialog.close();
    //     }
    // }, [deleteSure]);


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
        value: string | number
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

        if (!movie || movie.genres.length === 0) {
            alert("Välj minst en genre.");
            return;
        }

        // console.log("Movie to be updated:", JSON.stringify(movie));
        if (!movie) return;

        // Andra klicket uppdaterar filmen
        try {
            setIsSaving(true);

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(movie),
            });
            console.log("Movie to be updated:", JSON.stringify(movie));

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

    // const updateGenres = (value: string) => {
    //     setMovie((currentMovie) => {
    //         if (!currentMovie) return currentMovie;

    //         const genres: Genre[] = value
    //             .split(",")
    //             .map((genreName) => genreName.trim())
    //             .filter((genreName) => genreName !== "")
    //             .map((genreName) => ({
    //                 genreName,
    //             }));

    //         return {
    //             ...currentMovie,
    //             genres,
    //         };
    //     });
    // };

    const toggleGenre = (genreId: number, genreName: string) => {
        setMovie((currentMovie) => {
            if (!currentMovie) {
                console.log("Ingen film finns i state");
                return currentMovie;
            }
            console.log("Movie genres:", movie?.genres);
            console.log("isEditing:", isEditing);

            const currentGenres = currentMovie.genres ?? [];

            const alreadySelected = currentGenres.some(
                (genre) => genre.genreId === genreId
            );

            const updatedGenres = alreadySelected
                ? currentGenres.filter(
                    (genre) => genre.genreId !== genreId
                )
                : [
                    ...currentGenres,
                    {
                        genreId,
                        genreName,
                    },
                ];

            return {
                ...currentMovie,
                genres: updatedGenres,
            };
        });
    };
    // if (!movie) {
    //     return <p>Laddar filmen...</p>;
    // }


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
                        <label htmlFor="movie-year">År:</label>
                        <input
                            id="movie-year"
                            name="year"
                            type="number"
                            inputMode="numeric"
                            placeholder="Exempel: 1997"
                            min={1888}
                            max={new Date().getFullYear() + 10}
                            step={1}
                            value={movie.year}
                            disabled={!isEditing}
                            onChange={(event) =>
                                updateMovieField("year", event.target.value)
                            }
                        />
                        <p>Genre:</p>
                        <select
                            value=""
                            style={{ height: "30px" }}
                            disabled={!isEditing}
                            onChange={(event) => {
                                const genreId = Number(event.target.value);
                                const genreName = genreMap[genreId];

                                if (!genreId || !genreName) return;

                                toggleGenre(genreId, genreName);
                            }}
                        >
                            <option value="">Välj genre</option>

                            {Object.entries(genreMap).map(([id, name]) => {
                                const genreId = Number(id);

                                const selected = (movie?.genres ?? []).some(
                                    (genre) => genre.genreId === genreId
                                );

                                return (
                                    <option key={genreId} value={genreId}>
                                        {selected ? `✓ ${name}` : name}
                                    </option>
                                );
                            })}
                        </select>
                        <input
                            className="genre-input"
                            type="text"
                            placeholder="Inga genres valda"
                            value={(movie?.genres ?? [])
                                .map((genre) => genre.genreName)
                                .join(", ")}
                            readOnly
                        />
                        {/* <p>Synopsis:</p>
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
                        /> */}
                        <p>URL Film Bild:</p>
                        <input type="text" placeholder="URL Movie Pic" value={movie?.details.urlMoviePic} disabled={!isEditing}
                            onChange={(e) => updateDetailsField("urlMoviePic", e.target.value)}
                        />
                    </span>
                    <span>
                        <div className="movie-image-container">
                            {movie.details.urlMoviePic.trim() ? (
                                <img
                                    src={movie.details.urlMoviePic}
                                    alt={movie.title || "Filmomslag"}
                                    className="movie-image"
                                />
                            ) : (
                                <div className="movie-image-placeholder">
                                    <span>Ingen bild</span>
                                </div>
                            )}
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-evenly", marginTop: "10px" }}>
                            <Link to="/"><button type="button">Tillbaka</button></Link>
                            <button type="submit" disabled={isSaving}>
                                Lägg till
                                {/* {isSaving
                                    ? "Uppdaterar..."
                                    : isEditing
                                        ? "Update"
                                        : "Edit"} */}
                            </button>
                            {/* <button type="button" onClick={() => setDeleteSure(true)}>Ta bort</button> */}
                            {deleteSure && (
                                <dialog
                                    ref={dialogRef}
                                    className="dialog"
                                >
                                    <p>Är du säker på att du vill ta bort filmen?</p>
                                    <div style={{ display: "flex", justifyContent: "space-evenly" }}>

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

export default NewMovieForm;   