import React, {useState} from 'react'
import { Card, Avatar, Col, Typography, Row } from 'antd';
import {Link} from "react-router-dom";
import {API_KEY, IMAGE_BASE_URL, IMAGE_SIZE, NO_IMG, POSTER_SIZE} from "../../Config";


const FavoriteFragmentLikesItem = (props) => {

    let { page } = props

    console.log("Fav Page: ", page);

    const endpoint = `https://api.themoviedb.org/3/movie/${page.videoId}?api_key=${API_KEY}&language=en-US`

    const [posterPath, setPosterPath] = useState("");
    const [originalTitle, setOriginalTitle] = useState("");

    fetch(endpoint)
        .then(result => result.json())
        .then(result => {
            console.log(result);
            setPosterPath(result.poster_path);
            setOriginalTitle(result.original_title);
        })

    console.log("FavoriteFragmentLikesItem props: ", props)

    return (
        <Col key={props.index} lg={6} md={8} xs={24}>
            <div style={{ position: 'relative' }}>
                {/* take us to the moviedetail page */}
                <Link to={`/movie/${page.movieId}`} >
                    <img alt={originalTitle} src={`${IMAGE_BASE_URL}w154${posterPath}`}/>
                    {originalTitle}
                </Link>
            </div>
        </Col>
    )

}

export default FavoriteFragmentLikesItem
