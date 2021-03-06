import './LandingPageStyle.css'
import React, { useEffect, useState, useRef } from 'react'
import {Typography, Row, Col, Divider} from 'antd';
import {API_URL, API_KEY, IMAGE_BASE_URL, IMAGE_SIZE, POSTER_SIZE, NO_IMG} from '../../Config'
import MainImage from './Sections/MainImage'
import {Link} from "react-router-dom";
import axios from "axios";
import { USER_SERVER } from '../../Config';
import ProfilePage from "../ProfilePage/ProfilePage";
import OtherUserList from "./Sections/OtherUserList";
import NavBar from "../NavBar/NavBar";
import RightMenu from "../NavBar/Sections/RightMenu";
import MovieCards from "../../cards/MovieCards";
import Modal from "../../modal/Modal";
import RecentPagesList from "./Sections/RecentPagesList";
import {Button, TextField} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AccountBoxIcon from  "@material-ui/icons/AccountBox";
const { Title } = Typography;

const LandingPage = () => {

    const [Movies, setMovies] = useState([])
    const [MainMovieImage, setMainMovieImage] = useState(null)
    const [role, setRole] = useState(-1);

    // apparently useful?
    axios.defaults.withCredentials = true;
    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        fetchMovies(endpoint)

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
    console.log("TESTS")

    const fetchMovies = (endpoint) => {

        fetch(endpoint)
            .then(result => result.json())
            .then(result => {
                // console.log(result)
                // console.log('Movies',...Movies)
                // console.log('result',...result.results)
                setMovies([...Movies, ...result.results])
                setMainMovieImage(MainMovieImage || result.results[0])
            })
            .catch(error => console.error('Error:', error)
            )
    }

    const [searchTerm, setSearchTerm] = useState('');

    const handleOnChange = (e) => {
        setSearchTerm(e.target.value);
    }

    // if (localStorage.getItem("modalWasSeen") === true) {
    //     document.body.classList.add('overlay')
    // }

    console.log("modalWasSeen: ", localStorage.getItem("modalWasSeen"));
    if (localStorage.getItem("modalWasSeen") !== "true") {
        return <Modal/>
    }
        return (
        <div className="container">
            <div className="header search-landingpage">
                <div>
                    <TextField
                        size="small"
                        label="Search Movies"
                        variant="outlined"
                        className="search"
                        type="search"
                        placeholder="Search Movies..."
                        value={searchTerm}
                        onChange={handleOnChange}
                    />
                    <span className="search-button">
                    {/* can't search with an empty search bar, so disabled = searchTerm.length === 0 */}
                    {/*    height is set so TextField and Button are same height*/}
                    <Button disabled={searchTerm.length === 0} style={{ "height": "40px", width: "30%" }} variant="outlined" startIcon={<SearchIcon />} >
                        <Link to={{
                            pathname: `/searchpage/${searchTerm}`,
                            state: {searchTerm: searchTerm}
                        }} disabled={searchTerm.length === 0} className="btn btn-primary">SEARCH!
                        </Link>
                    </Button>
                    </span>
                </div>
                {/* hide profile option if not logged in, empty <div></div> is intentional. */}
                {role === -1 ?
                    <div></div>
                    :
                    <Button style={{ "height": "40px" }} variant="outlined" startIcon={<AccountBoxIcon />} >
                        <Link to={{
                            pathname: `/profile`
                        }} className="btn btn-primary">PROFILE
                        </Link>
                    </Button>
                }
            </div>
            {/*${role}, NOTLOGGED(-1) / USER(0) / PREMIUM USER(1) / ADMIN(2)*/}
            {MainMovieImage &&
            <MainImage
                image={`${IMAGE_BASE_URL}${IMAGE_SIZE}${MainMovieImage.backdrop_path}`}
                title={MainMovieImage.original_title}
                text={MainMovieImage.overview}
            />

            }

            <div className="inner-container">
                {/*Newest Users!*/}
                <OtherUserList/>

                {/*Only want to show this to people who are logged in*/}
                {role === -1 ?
                    <div></div>
                    :
                    <RecentPagesList/>
                }
                <Title level={2}> Movies by latest </Title>
                <hr/>
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

export default LandingPage
