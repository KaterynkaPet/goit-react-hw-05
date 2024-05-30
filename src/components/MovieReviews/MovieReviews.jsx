import { fetchMovieReviews } from '../../movies-api';
import { useEffect, useState, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import css from './MovieReviews.module.css';

function MovieReviews() {
    const [MovieReviews, setMovieReviews] = useState([]);
    const { movieId } = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
   
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
        getMovieReviews();
    }, [movieId]);
     
     return (
        <div className={css.container}>
             <Suspense fallback={<div>Loading page...</div>}>
                {error && <div className={css.err}>Something went wrong! Please, try reloading this page!</div>}
                {MovieReviews.length > 0 ? (
                    <ul className={css.list}>
                        {MovieReviews.map(({ id, author, content }) => (
                            <li key={id} className={css.item}>
                                <p className={css.author}>{author}</p>
                                <p className={css.content}>{content}</p>
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