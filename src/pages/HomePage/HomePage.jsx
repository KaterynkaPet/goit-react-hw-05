import { useEffect, useState, Suspense } from "react";
import { fetchTrendMovies } from '../../movies-api'
import MovieList from '../../components/MovieList/MovieList'
import toast from "react-hot-toast";
import css from './HomePage.module.css';


const HomePage = () => {
    const [trendMovies, setTrendMovies] = useState([]);
    const [loading, setLoading] = useState(null);

    useEffect(() => {
        async function getTrendMovies() {
            try {
                setLoading(true);
                const data = await fetchTrendMovies();
                setTrendMovies(data.results);
            } catch {
                toast.error('Something went wrong! Please try again!')
            } finally {
                setLoading(false);
            }
        }
        getTrendMovies();
    }, [])
    return (
        <div>
            <h1>Trending today</h1>
             <Suspense fallback={<div>Loading page...</div>}>
                <ul>
                    <MovieList movies={trendMovies} />
                </ul>
            </Suspense>
        </div>
    );  
};

export default HomePage;