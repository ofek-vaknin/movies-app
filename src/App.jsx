import {useState, useEffect} from 'react'
import './App.css'
import {MovieCard} from './components/MovieCard'
import "./style.css"

const PAGE_SIZE = 3;

function App() {
    const [movies, setMovies] = useState([]);
    const [searchTitle, setSearchTitle] = useState("")
    const [genre, setGenre] = useState("all")
    const [stars, setStars] = useState("all")
    const [liked, setLiked] = useState(() => {
        const saved = localStorage.getItem("likedMovies");
        return saved ? JSON.parse(saved) : {};
    })
    const [page,setPage] = useState(1);
        /*if(saved)
        {
            return JSON.parse(saved);
        }
        else{
            return {};
        */

    useEffect(() =>{
        localStorage.setItem("likedMovies", JSON.stringify(liked));
    },[liked]);

    useEffect(() => {
        setTimeout(() => setPage(1), 0);
    }, [searchTitle, genre, stars]);

    useEffect(() => {
        async function loadMovies() {
            const response = await fetch("/movies.json")
            const data =  await response.json()
            const moviesArray = Object.entries(data).map(([key, value]) => ({
                id: key,
                title: value.title,
                year: value.year,
                genre: value.genre,
                stars: value.stars
            }))
            moviesArray.sort((a, b) =>  b.year - a.year)
            setMovies(moviesArray)
        }
        void loadMovies()
    }, []);



    /*const movies = Object.entries(data).map(function (entry) {
    const id = entry[0];
    const movie = entry[1];

    return {
      id: id,
      title: movie.title,
      year: movie.year,
      genre: movie.genre,
      stars: movie.stars
    };
  });
  */
    const filteredMovies = movies.filter(function (movie) {
        const titleMatch = movie.title.toLowerCase().includes(searchTitle.toLowerCase());//each string contains ""
        const genreMatch = genre === "all" || movie.genre === genre;
        const starsMatch = stars === "all" || movie.stars === Number(stars);
        return titleMatch && genreMatch && starsMatch;
    });

    function toggleLike(movieId) {
        setLiked(function (prev) {
            const newState = {...prev };

            if (newState[movieId] === true) {
                newState[movieId] = false;
            } else {
                newState[movieId] = true;
            }

            return newState;
        });
    }

// paginantion
    const totalPages =  Math.max(1,Math.ceil(filteredMovies.length / PAGE_SIZE));
    const start = (page - 1) * PAGE_SIZE;
    const visibleMovies = filteredMovies.slice(start, start + PAGE_SIZE);


    return (
        <div className="container">
            <h1>Movies</h1>

            <div className="searchBox">
                <input
                    className="searchInput"
                    type="text"
                    placeholder="Search by name..."
                    value={searchTitle}
                    onChange={(e) => setSearchTitle(e.target.value)}
                />
            </div>


            <div className="genre">
                <p>Genre:</p>
                <label>
                    <input
                        type="radio"
                        name="genre"
                        value="Drama"
                        onChange={(e) => setGenre(e.target.value)}
                        checked={genre === "Drama"}
                    />
                    Drama
                </label>

                <label>
                    <input
                        type="radio"
                        name="genre"
                        value="Action"
                        onChange={(e) => setGenre(e.target.value)}
                        checked={genre === "Action"}
                    />
                    Action
                </label>

                <label>
                    <input
                        type="radio"
                        name="genre"
                        value="Comedy"
                        onChange={(e) => setGenre(e.target.value)}
                        checked={genre === "Comedy"}
                    />
                    Comedy
                </label>

                <label>
                    <input
                        type="radio"
                        name="genre"
                        value="Fantasy"
                        onChange={(e) => setGenre(e.target.value)}
                        checked={genre === "Fantasy"}
                    />
                    Fantasy
                </label>


                <label>
                    <input
                        type="radio"
                        name="genre"
                        value='all'
                        onChange={e => setGenre(e.target.value)}
                        checked={genre === "all"}
                    />
                    ALL
                </label>

            </div>

            <div className="stars">
                <label>Stars</label>
                <select
                    value={stars}
                    onChange={(e) => setStars(e.target.value)}
                >
                    <option value="all">All</option>
                    <option value="1">1 star</option>
                    <option value="2">2 stars</option>
                    <option value="3">3 stars</option>
                    <option value="4">4 stars</option>
                    <option value="5">5 stars</option>
                </select>
            </div>

            <div className="next_prevbtn">
                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}>
                    Prev
                </button>

                <span> page {page}/{totalPages}</span>

                <button
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}>
                    Next
                </button>
            </div>


            <div className="grid">
                {visibleMovies.map((movie) => {
                    return (<MovieCard
                            key={movie.id}
                        movie={movie}
                        isLiked={liked[movie.id]}
                        onToggleLike={toggleLike}
                    />
                    );
                })}
            </div>
        </div>
    );
}


export default App
