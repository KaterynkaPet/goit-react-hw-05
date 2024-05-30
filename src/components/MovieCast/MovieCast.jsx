import { useState, useEffect, Suspense, lazy } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCast } from '../../movies-api'
import toast from 'react-hot-toast';
import css from './MovieCast.module.css';

function MovieCast ( ) {
    const [movieCast, setMovieCast] = useState([]);
    const { movieId } = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const defaultImg = 'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';

    
    useEffect(() => {
        const getMovieCast = async () => {
            try {
                setLoading(true);        
                const data = await fetchMovieCast(movieId);
                setMovieCast(data.cast);
            } catch (error) {
                toast.error("Something went wrong! Please try reloading this page!");
            } finally {
                setLoading(false);
            }
        };

        getMovieCast();
    }, [movieId]);

    return (
        <div>
            <Suspense fallback={<div>Loading page...</div>}>
                <LazyMovieReviews />
                {error && <div>Something went wrong! Please, try reloading this page!</div>}
                {movieCast.length > 0 && (
                    <ul>
                        {movieCast.map(({ id, name, profile_path, character }) => (
                            <li key={id}>
                                <img
                                    src={profile_path ? `https://image.tmdb.org/t/p/w200${profile_path}` : defaultImg}
                                    alt={name}
                                    loading='lazy'
                                    width='120'
                                />
                                <h3>{name}</h3>
                                <p>Character: {character}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </Suspense>
        </div>
    )
};

export default MovieCast;