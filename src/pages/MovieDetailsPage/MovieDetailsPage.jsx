import { fetchMovieDetails } from '../../movies-api';
import { useState, useEffect, Suspense, useRef } from 'react';
import { useParams, Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import css from './MovieDetailsPage.module.css';
import toast from 'react-hot-toast';

//import clsx from 'clsx';

function MovieDetailsPage () {
    const { movieId } = useParams();
    const [ movieDetailsPage, setMovieDetailsPage ] = useState({});
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const goBackLink = useRef(location.state ?? '/movies');
    const defaultImg = 'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';
    const { original_title, overview, genres, poster_path, vote_average } = movieDetailsPage;

    //const buildLinkClass = ({ isActive }) => {
       // return clsx(css["info-link"], isActive && css.active);
   // };

    useEffect(() => {
        const getMovieDetails = async () => {
            try {
                setLoading(true);
                const details = await fetchMovieDetails(movieId);
                setMovieDetailsPage(details);
            } catch (error) {
                toast.error('Something went wrong! Please try reloading this page!');
            } finally {
                setLoading(false);
            }
        }
        getMovieDetails();
    }, [movieId]);

     const scoreToFixed = Number(vote_average).toFixed(2);

        return (
            <>
                <div>
                    <Link to='/'>Go back</Link>
                </div>
                <div>
                <img 
                    src={poster_path ? `https://image.tmdb.org/t/p/w300${poster_path}` : defaultImg}
                    loading='lazy'
                    alt='Movie poster'
                />
                    <div>
                        <h1>{original_title}</h1>
                        <p>User score: {scoreToFixed}</p>
                        <h2>Overview</h2>
                        <p>{overview}</p>
                        <h2>Genres</h2>
                        <ul>
                        {genres && genres.length > 0 && genres.map(({ id, name }) => <li key={id}>{name}</li>)}
                    </ul>
                </div>
            </div>
            <div >
                <h3>Additional information</h3>
                <ul>
                    <li>
                        <NavLink to={`/movies/${movieId}/cast`} state={{ ...location.state }}>Cast</NavLink>
                    </li>
                    <li>
                        <NavLink to={`/movies/${movieId}/reviews`} state={{ ...location.state }}>Reviews</NavLink>
                    </li>
                </ul>
            </div>   
                <Suspense fallback={<div>Loading page...</div>}>
                    <Outlet />
                </Suspense>
            </>
    )
};

export default MovieDetailsPage;