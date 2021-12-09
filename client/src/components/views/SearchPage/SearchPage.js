import React, { useEffect, useState, useRef } from 'react'
import { Typography, Row, Button } from 'antd';
import {API_URL, API_KEY, IMAGE_BASE_URL, IMAGE_SIZE, POSTER_SIZE, NO_IMG} from '../../Config'
import {Link, useLocation} from "react-router-dom";
import MovieCards from "../../cards/MovieCards";
const { Title } = Typography;

const SearchPage = () => {

    const SEARCH_API = "https://api.themoviedb.org/3/search/movie?&api_key=c7d55be49c2a5de2c676827ccfc0a7ba&query="

    const [Movies, setMovies] = useState([])

    console.log("asdf");
    let data = useLocation();
    let theMovie = data.state.searchTerm;
    console.log("theMovie: " + theMovie);

    useEffect(() => {
        getMovies(SEARCH_API + theMovie);
    }, []);

    const getMovies = (API) => {
        fetch(API)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setMovies(data.results);
            });
    }

    if (!Movies || Movies.length === 0 || theMovie === "") {
        return (
            <div><span>No search results!</span></div>
        )
    }
    else {
        return (
            <div style={{ width: '100%', margin: '0' }}>
                <div style={{ width: '85%', margin: '1rem auto' }}>

                    <Title level={2} > Search Results </Title>
                    <hr />
                    <div className="movie-container">
                        {Movies && Movies.map((movie, index) => (
                            <div key={index}>
                                <MovieCards
                                    image={movie.poster_path ?
                                        `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                                        : NO_IMG}
                                    movieId={movie.id}
                                    movieName={movie.original_title}
                                    movieAverage={movie.vote_average}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchPage
