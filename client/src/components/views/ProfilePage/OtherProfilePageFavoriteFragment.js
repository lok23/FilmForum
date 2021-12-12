import React, { useEffect, useState } from 'react'
import { Typography, Popover, Button } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {API_KEY, API_URL, IMAGE_BASE_URL, NO_IMG, POSTER_SIZE, USER_SERVER} from '../../Config'
import {Link, useParams} from "react-router-dom";
import MovieCards from "../../cards/MovieCards";
import RecentPagesList from "../LandingPage/Sections/RecentPagesList";
import ProfilePageLikesListFragment from "./ProfilePageLikesListFragment";
import OtherProfilePageLikesListFragment from "./OtherProfilePageLikesListFragment";

const { Title } = Typography;

const OtherProfilePageFavoriteFragment = () => {
    const params = useParams();
    console.log("PARAMS: ", params)

    const [profileId, setProfileId] = useState("");
    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get(`${USER_SERVER}/peepee/${params.user}`).then((response) => {
            console.log("response peepee : ", response)

            if (response.data === null) {
                // do nothing
            } else if (response === undefined) {
                alert("that profile doesn't exist!");
            } else {
                setProfileId(response.data._id);
            }

        })
        fetchFavoredMovie()
    }, [profileId])

    console.log("peepee profileId: ", profileId);
    const [Favorites, setFavorites] = useState([]);

    const variable = {userFrom: profileId};

    console.log("variable: ", variable);

    const fetchFavoredMovie = () => {
        axios.post('/api/favorite/getFavoredMovie', variable)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.favorites)
                    setFavorites(response.data.favorites)
                } else {
                    alert('Failed to get subscription videos')
                }
            })
    }

    const renderCards = Favorites.map((favorite, index) => {
        console.log("favorite: ", favorite);
        const content = (
            <div>
                <Link to={`/movie/${favorite.movieId}`} >
                    {/* Not every movie has a poster, so we need the ternary operator to account for that */}
                    {favorite.moviePost ?
                        <img src={`${IMAGE_BASE_URL}${POSTER_SIZE}${favorite.moviePost}`} />
                        : "no image"}
                </Link>
            </div>
        );

        return <tr key={index}>

            <Popover content={content} title={`${favorite.movieTitle}`}>
                <td>{favorite.movieTitle}</td>
            </Popover>
        </tr>
    })

    return (
        <div style={{ width: '25%'}}>
            <Title level={2} > Favorite Movies By Me </Title>
            <hr />
            {
                <table>
                    <thead>
                    <tr>
                        <th>Movie Title</th>
                    </tr>
                    </thead>
                    <tbody>
                    {renderCards}
                    </tbody>
                </table>
            }
        </div>
    )
}

export default OtherProfilePageFavoriteFragment
