import React, { useEffect, useState } from 'react'
import {Row} from "antd";
import Title from "antd/es/typography/Title";
import axios from "axios";
import {API_KEY, IMAGE_BASE_URL, IMAGE_SIZE, NO_IMG, POSTER_SIZE} from "../../Config";
import FavoriteFragmentLikesItem from "./FavoriteFragmentLikesItem";

const FavoriteFragmentLikesList = (props) => {

    const [likes, setLikes] = useState([]);

    let variable = { userFrom: localStorage.getItem('userId') }

    useEffect(() => {
        axios.post('/api/like/getUserLikes', variable)
            .then(response => {
                if (response.data.success) {
                    console.log("getUserLikes response.data: ", response.data)
                    setLikes(response.data.likes)
                } else {
                    alert('Failed to get likes')
                }
            })
    }, [])

    console.log("FavoriteFragmentLikesList likes: ", likes);

    return (
        <div>
            <Title level={2}>This user liked:</Title>
            <hr/>
            <Row gutter={[16, 16]}>
                {likes.map((page, index) => (
                    <React.Fragment key={index}>
                        <FavoriteFragmentLikesItem page={page}/>
                    </React.Fragment>
                ))}
            </Row>
            <br/>
        </div>
    )
}

export default FavoriteFragmentLikesList