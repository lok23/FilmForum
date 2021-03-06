import React from 'react'
import { Card, Avatar, Col, Typography, Row } from 'antd';
import { IMAGE_BASE_URL } from '../Config';
import "./MovieCards.css"
import {Link} from "react-router-dom";

const setVoteClass = (movie_Average) => {
    if (movie_Average >= 8) {
        return "green";
    } else if (movie_Average >= 6) {
        return "yellow";
    } else {
        return "red";
    }
}

const MovieCards = (props) => {

    let { key, image, movieId, movieName, movieAverage } = props

    return (
            <div className="movie">
                {/* take us to the moviedetail page */}
                <Link to={`/movie/${movieId}`} >
                    <img alt={movieName} src={image} />
                </Link>
                <div className="movie-info">
                    <h3>{movieName}</h3>
                    <span className={setVoteClass(movieAverage)}>{movieAverage}</span>
                </div>
            </div>
    )
}

export default MovieCards