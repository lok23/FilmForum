import React, { useEffect, useState } from 'react'
import { List, Avatar, Row, Col } from 'antd';
import axios from 'axios';

import Comments from './Sections/Comments'
import LikeDislikes from './Sections/LikeDislikes';
import {API_URL, API_KEY, IMAGE_BASE_URL, IMAGE_SIZE, USER_SERVER, POSTER_SIZE, NO_IMG} from '../../Config'
import MainImage from '../../views/LandingPage/Sections/MainImage';
import MovieInfo from './Sections/MovieInfo';
import Favorite from './Sections/Favorite';
import ActorCards from "../../cards/ActorCards";
import {Link} from "react-router-dom";

import YouTubeIcon from '@material-ui/icons/YouTube';
import { Button } from '@material-ui/core';
import TrailerButton from "./TrailerButton";
import FavoritedUsers from "./Sections/FavoritedUsers";
import MovieCards from "../../cards/MovieCards";
import {useSelector} from "react-redux";

const MovieDetailPage = (props) => {

    const user = useSelector(state => state.user)

    const movieId = props.match.params.movieId
    const [Movie, setMovie] = useState([])
    const [Casts, setCasts] = useState([])
    const [CommentLists, setCommentLists] = useState([])
    const [ActorToggle, setActorToggle] = useState(false)
    const [role, setRole] = useState(-1);
    const [trailer, setTrailer] = useState("");
    const [favorites, setFavorites] = useState([]);
    const movieVariable = {
        movieId: movieId
    }

    axios.defaults.withCredentials = true;

    // Authenticates user
    useEffect(() => {
        axios.get(`${USER_SERVER}/auth`).then((response) => {
            if (response.data.role === undefined) {
                alert("not logged in");
            } else {
                setRole(response.data.role);
            }
        })
    }, [])

    // Saves that user has visited this page
    useEffect(() => {
        let variable = { userFrom: localStorage.getItem('userId') }
        const variables = {
            userFrom: localStorage.getItem('userId'),
            movieId: props.match.params.movieId
        }

        console.log("--------variables------");
        console.log("userFrom: ", localStorage.getItem('userId'));
        console.log("movieId: ", props.match.params.movieId);

        if (variable !== null) {
            axios.post('/api/recent_pages/saveRecentPage', variables)
                .then(response => {
                    console.log("response from recent_pages/saveRecentPage: ", response);
                    if (response.data.success) {
                        console.log('response.data.comments', response.data.comments)
                    } else {
                        // alert('could not save this recentPage')
                    }
                })
        }
    }, []);

    // Gets details about this movie
    useEffect(() => {
        let endpointForMovieInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;
        fetch(endpointForMovieInfo)
            .then(result => result.json())
            .then(result => {
                console.log(result)
                setMovie(result)

                let endpointForCasts = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
                fetch(endpointForCasts)
                    .then(result => result.json())
                    .then(result => {
                        console.log(result)
                        setCasts(result.cast)
                    })

            })
            .catch(error => console.error('Error:', error)
            )
    }, [])

    // Fetches comments for this movie
    useEffect(() => {
        axios.post('/api/comment/getComments', movieVariable)
            .then(response => {
                console.log(response)
                if (response.data.success) {
                    console.log('response.data.comments', response.data.comments)
                    setCommentLists(response.data.comments)
                } else {
                    alert('Failed to get comments Info')
                }
            })
    }, [CommentLists]) // Whenever we modify CommentLists we need to re-render the page

    // Handles button click for whether we want to view actors
    const toggleActorView = () => {
        setActorToggle(!ActorToggle)
    }

    // console.log("CL: ", CommentLists);

    console.log("movieID: ", movieId);

    const trailerJSON = `http://api.themoviedb.org/3/movie/${movieId}/videos?api_key=844dba0bfd8f3a4f3799f6130ef9e335`

    // Get trailer link for this movie
    useEffect(() => {
        console.log ("DUMMY");
        fetch(trailerJSON)
            .then(result => result.json())
            .then(result => {
                console.log("trailer: ", result);
                // result.results[0] will be undefined if the movie doesn't have a trailer
                if (result.results[0] !== undefined) {
                    console.log("trailer.results[0].key: ", result.results[0].key);
                    setTrailer(result.results[0].key)
                }
            })
    }, [])

    // Get users who favorited this movie
    useEffect(() => {
        axios.post('/api/favorite/favoriteNumberTEST', movieVariable)
            .then(response => {
                if (response.data.success) {
                    console.log("favoriteNumberTEST: ", response.data);
                    setFavorites(response.data.favorite);
                } else {
                    alert('Failed to get Favorite');
                }
            })
    }, [favorites]) // If user adds to favorites or removes from favorites, we want to re-render which users have favorited it

    console.log("favorites: ", favorites);

    return (
        <div>
            {/*{`the role, ${role}`}*/}
            {/* Header */}
            {
                <MainImage
                    image={`${IMAGE_BASE_URL}${IMAGE_SIZE}${Movie.backdrop_path}`}
                    title={Movie.original_title}
                    text={Movie.overview}
                />
            }

            {/* Body */}
            <div style={{ width: '85%', margin: '1rem auto' }}>

                <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                    <Favorite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')} />

                    <TrailerButton role={role} trailer={trailer}/>
                </div>
                <div>
                    {/* users that favorited this movie */}
                    <h3>Users who favorited this movie:</h3>
                    {
                        favorites.length > 0 ?
                            favorites.map((favorited, index) => (
                                <FavoritedUsers favorited={favorited}/>
                            ))
                            :
                            <span>No one has favorited this movie!</span>
                    }
                </div>

                {/* Movie Info */}
                {
                    <MovieInfo movie={Movie} />
                }

                <br />
                {/* Actors Grid*/}

                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                    <Button variant="contained" color="primary" onClick={toggleActorView}>Toggle Actor View </Button>
                </div>

                {ActorToggle &&
                    <div className="movie-container">
                        {
                        Casts.map((cast, index) => (
                            cast.profile_path &&
                            <ActorCards image={cast.profile_path} characterName={cast.characterName} />
                        ))
                        }
                    </div>
                }
                <br />

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <LikeDislikes video videoId={movieId} userId={localStorage.getItem('userId')} />
                </div>

                {/* Comments */}
                <Comments movieTitle={Movie.original_title} CommentLists={CommentLists} postId={movieId} userRole={role}/>

            </div>

        </div>
    )
}

export default MovieDetailPage

