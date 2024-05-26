import css from './MoviesPage.module.css';
import { useState } from 'react';
import {toast} from 'react-hot-toast'


const MoviesPage = ({onSubmit}) => {
   const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim() === '') {
            toast.error('Please enter a search query');
            return;
        }
        onSubmit(query);
    };

    return (
        <header className={css.searchBar}>
            <div className={css.container}>
                <form onSubmit={handleSubmit} className={css.form}>
                    <div className={css.inputWrapper}>
                                                  
                        <input
                            type='text'
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            autoComplete='off'
                            autoFocus
                            className={css.input}
                        />

                        <button type='submit' className={css.searchButton}>
                        Search
                        </button>
                    </div>
                </form>
            </div>
        </header>
    )
};


export default MoviesPage;