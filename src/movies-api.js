import axios from "axios";

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
const API_KEY = '81c2b6f0e3f640f0033fb8c9135adae2';

export const fetchTrendMovies = async () => {
    const response = await axios.get(`trending/movie/day?api_key=${API_KEY}`);
    return response.data;
}

export const fetchSearchMovies = async (query) => {
    const response = await axios.get(`search/movie?api_key=${API_KEY}&query=${query}&include_adult=false&language=en-US`);
    return response.data;
}

export const fetchMovieDetails = async (movieId) => {
    const response = await axios.get(`movie/${movieId}?api_key=${API_KEY}&language=en-US`);
    return response.data;
}

export const fetchMovieCast = async (movieId) => {
    const response = await axios.get(`movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`);
    return response.data;
}

export const fetchMovieReviews = async (movieId) => {
    const response = await axios.get(`movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US`);
    return response.data;
}