export function MovieCard({ movie, isLiked, onToggleLike }) {

    return (
        <div className="card">
            {/* Placeholder במקום תמונה */}
            <div className="imageBox">
                <div className="imagePlaceholder">movie image</div>
                <button
                    type="button"
                    className="likeBtn"
                    onClick={() => onToggleLike(movie.id)}
                >
                    {isLiked === true ? "❤️" : "🤍"}
                </button>
                <div className="genreBadge">{movie.genre}</div>
            </div>

            <div className="cardBody">
                <div className="movieTitle">{movie.title}</div>
                <div className="movieYear">{movie.year}</div>

                {/* כוכבים */}
                <div className="starsRow">{renderStars(Number(movie.stars))}</div>
            </div>
        </div>
    );
}

function renderStars(numOfStar) {
    const stars = [];
    let i = 0;
    while (i < numOfStar) {
        stars.push(<span key={i}>⭐</span>);
        i++;
    }
    return stars;
}

