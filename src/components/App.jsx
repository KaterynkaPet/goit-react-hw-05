import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navigation from "./Navigation/Navigation";
import css from './App.module.css';

const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const MovieDetailsPage = lazy (() => import('../pages/MovieDetailsPage/MovieDetailsPage'));
const MoviesPage = lazy (() => import('../pages/MoviesPage/MoviesPage'));
const NotFoundPage = lazy (() => import('../pages/NotFoundPage/NotFoundPage'));
const MovieReviews = lazy (() => import('./MovieReviews/MovieReviews'));
const MovieCast = lazy (() => import('./MovieCast/MovieCast'));


function App () {
  
  return (
    <div>
      <header className={css.header}>
        <Navigation />
      </header>
    <div className={css.separator}></div>
    <Suspense fallback={<div>Loading page...</div>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies:movieId" element={<MovieDetailsPage />} >
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
    </div>
  )
}

export default App;
