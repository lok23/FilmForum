import React, { useEffect, useState } from 'react'
import { List, Avatar, Row, Col } from 'antd';
import axios from 'axios';

import Comments from './Sections/Comments'
import LikeDislikes from './Sections/LikeDislikes';
import {API_URL, API_KEY, IMAGE_BASE_URL, IMAGE_SIZE, USER_SERVER} from '../../Config'
import MainImage from '../../views/LandingPage/Sections/MainImage';
import MovieInfo from './Sections/MovieInfo';
import Favorite from './Sections/Favorite';
import ActorCards from "../../cards/ActorCards";
import {Link} from "react-router-dom";

import YouTubeIcon from '@material-ui/icons/YouTube';
import { Button } from '@material-ui/core';
import TrailerButton from "./TrailerButton";

const MovieDetailPage = (props) => {
    const movieId = props.match.params.movieId
    const [Movie, setMovie] = useState([])
    const [Casts, setCasts] = useState([])
    const [CommentLists, setCommentLists] = useState([])
    const [ActorToggle, setActorToggle] = useState(false)
    const movieVariable = {
        movieId: movieId
    }

    useEffect(() => {
        // test role
        axios.get(`${USER_SERVER}/auth`).then((response) => {
            // this might not work, double check
            if (response.data.role === undefined) {
                alert("not logged in");
            } else {
                setRole(response.data.role);
            }
        })
    }, [])

    let variable = { userFrom: localStorage.getItem('userId') }

    useEffect(() => {
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
                    // if (response.data.success) {
                    //     console.log('response.data.comments', response.data.comments)
                    // } else {
                    //     alert('sad face')
                    // }
                })
        }
    }, []);

    useEffect(() => {

        let endpointForMovieInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;
        fetchDetailInfo(endpointForMovieInfo)

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

    const toggleActorView = () => {
        setActorToggle(!ActorToggle)
    }

    console.log("CL: ", CommentLists);

    const fetchDetailInfo = (endpoint) => {

        fetch(endpoint)
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
    }

    const [role, setRole] = useState(-1);

    // apparently useful?
    axios.defaults.withCredentials = true;
    useEffect(() => {
        // test role
        axios.get(`${USER_SERVER}/auth`).then((response) => {
            // this might not work, double check
            if (response.data.role === undefined) {
                alert("not logged in");
            } else {
                setRole(response.data.role);
            }
        })
    }, [])

    console.log("movieID: ", movieVariable);

    const trailerJSON = `http://api.themoviedb.org/3/movie/${movieId}/videos?api_key=844dba0bfd8f3a4f3799f6130ef9e335`

    const [trailer, setTrailer] = useState("");

    console.log("DOES THIS WORK")

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


    return (
        <div>
            {`the role, ${role}`}
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

                <TrailerButton role={role} trailer={trailer}/>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Favorite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')} />
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
                    <Row gutter={[16, 16]}>
                        {
                            Casts.map((cast, index) => (
                                cast.profile_path &&
                                <ActorCards image={cast.profile_path} characterName={cast.characterName} />
                            ))
                        }
                    </Row>
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

