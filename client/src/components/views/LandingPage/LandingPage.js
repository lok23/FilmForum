import './LandingPageStyle.css'
import React, { useEffect, useState, useRef } from 'react'
import {Typography, Row, Col, Divider} from 'antd';
import { API_URL, API_KEY, IMAGE_BASE_URL, IMAGE_SIZE, POSTER_SIZE } from '../../Config'
import MainImage from './Sections/MainImage'
import {Link} from "react-router-dom";
import axios from "axios";
import { USER_SERVER } from '../../Config';
import ProfilePage from "../ProfilePage/ProfilePage";
import OtherUserList from "./Sections/OtherUserList";
import NavBar from "../NavBar/NavBar";
import RightMenu from "../NavBar/Sections/RightMenu";
import MovieCards from "../../cards/MovieCards";
const { Title } = Typography;

function LandingPage() {

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

    return (
        <div className="container">
            <header className="header">
                <div>
                    <input className="search"
                           type="search"
                           placeholder="Search Movies..."
                           value={searchTerm}
                           onChange={handleOnChange}
                    />
                    {/* can't search with an empty search bar, so disabled = searchTerm.length === 0 */}
                    <Link to={{
                        pathname: `/searchpage/${searchTerm}`,
                        state: {searchTerm: searchTerm}
                    }} disabled={searchTerm.length === 0} className="btn btn-primary">SEARCH!
                    </Link>
                </div>
                {/* hide profile option if not logged in, empty <div></div> is intentional. */}
                {role === -1 ?
                    <div></div>
                    :
                    <Link to={{
                        pathname: `/profile`
                    }} className="btn btn-primary">PROFILE
                    </Link>
                }
            </header>
            ${role}, NOTLOGGED(-1) / USER(0) / MODERATOR(1) / ADMIN(2)
            {MainMovieImage &&
            <MainImage
                image={`${IMAGE_BASE_URL}${IMAGE_SIZE}${MainMovieImage.backdrop_path}`}
                title={MainMovieImage.original_title}
                text={MainMovieImage.overview}
            />

            }

            <div className="inner-container">
                <OtherUserList/>
                <Title level={2}> Movies by latest </Title>
                <hr/>
                <Row gutter={[16, 16]}>
                    {Movies && Movies.map((movie, index) => (
                        <div key={index}>
                            <MovieCards
                                image={movie.poster_path ?
                                    `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                                    : null}
                                movieId={movie.id}
                                movieName={movie.original_title}
                            />
                        </div>
                    ))}
                </Row>

            </div>

        </div>
    )
}

export default LandingPage
