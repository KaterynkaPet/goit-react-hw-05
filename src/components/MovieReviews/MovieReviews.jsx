import { fetchMovieReviews } from '../../movies-api';
import { useEffect, useState, Suspense, lazy } from 'react';
import toast from 'react-hot-toast';
import css from './MovieReviews.module.css';

function MovieReviews() {
    const [MovieReviews, setMovieReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const LazyMovieReviews = lazy(() => import('./MovieReviews'));

    useEffect(() => {
        const getMovieReviews = async () => {
            try {
                setLoading(true);
                const data = await fetchMovieReviews(movieId);
                setMovieReviews(data.results);
            } catch (error) {
                toast.error('Something went wrong! Please, try reloading this page!')
            } finally {
                setLoading(false);
            }
        }
        getMovieReviews(movieId);
    }, [movieId]);
     
     return (
        <div>
             <Suspense fallback={<div>Loading page...</div>}>
                 <LazyMovieReviews />
                 {error && <div>Something went wrong! Please, try reloading this page!</div>}
                 {MovieReviews.length > 0 ? (
                     <ul>
                         {MovieReviews.map(({ id, autor, content }) => (
                             <li key={id}>
                                 <p>{author}</p>
                                 <p>{content}</p>
                             </li>
                         ))}
                     </ul>
                 ) : (
                     <p>We do not have any reviews for this movie yet</p>
                 )}
            </Suspense>
        </div>
    )
}
 
export default MovieReviews;