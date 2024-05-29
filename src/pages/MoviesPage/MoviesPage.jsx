import { useSearchParams } from 'react-router-dom';
import { useState, useEffect, Suspense } from 'react';
import { toast } from 'react-hot-toast';
import PropTypes from 'prop-types';

import { fetchSearchMovies } from '../../movies-api';
import MovieList from '../../components/MovieList/MovieList';

import css from './MoviesPage.module.css';


function MoviesPage({onSubmit}) {
    const [query, setQuery] = useState('');
    const [moviesList, setMovieList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const movieName = searchParams.get('movieName') ?? '';

    useEffect(() => {
        if (!movieName) return;
        setMovieList([]);
        setLoading(true);
        const getMovieSearch = async (movieName) => {
            try {
                const data = await fetchSearchMovies(movieName);
                if (!data.results.length) {
                    setError(true);
                    toast.error('Something went wrong! Please, try again!')
                    return;
                }
                setMovieList(data.results);
            } catch (error) {
                setError(true);
                console.log(error);
                toast.error('Something went wrong! Please, try reloading this page!');
            } finally {
                setLoading(false);
                setError(false);
            }
        };
        getMovieSearch(movieName);
    }, [movieName]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim() === '') {
            toast.error('Please enter a search query');
            return;
        }
        setSearchParams({ movieName: query });
        setQuery('');
    };

    return (
        <div className={css.container}>
            <form onSubmit={handleSubmit} className={css.form}>
                <div className={css.inputWrapper}>
                    <Suspense fallback={<div>Loading page...</div>}>                    
                        <input
                            type='text'
                            name='movieName'
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            autoComplete='off'
                            autoFocus
                            className={css.input}
                        />

                        <button type='submit' className={css.searchButton}>
                        Search
                        </button>
                    </Suspense>
                </div>
            </form>
                {error && <div>Something went wrong! Please, try reloading this page!</div>}
                <MovieList movies={moviesList} />
        </div>
        
    )
   
}


export default MoviesPage;