import React, {useState} from 'react'
import { Card, Avatar, Col, Typography, Row } from 'antd';
import {Link} from "react-router-dom";
import {API_KEY, IMAGE_BASE_URL, IMAGE_SIZE, NO_IMG} from "../../../Config";


const RecentPagesItem = (props) => {

    let { page } = props

    const endpoint = `https://api.themoviedb.org/3/movie/${page.movieId}?api_key=${API_KEY}&language=en-US`

    const [posterPath, setPosterPath] = useState("");

    fetch(endpoint)
        .then(result => result.json())
        .then(result => {
            console.log(result);
            setPosterPath(result.poster_path)
        })

    console.log("OtherUserItem props: ", props)

    return (
        <Col key={props.index} lg={6} md={8} xs={24}>
            <div style={{ position: 'relative' }}>
                {/* take us to the moviedetail page */}
                <Link to={`/movie/${page.movieId}`} >
                    <img alt={NO_IMG} src={`${IMAGE_BASE_URL}w154${posterPath}`} />
                </Link>
            </div>
        </Col>
    )

}

export default RecentPagesItem
