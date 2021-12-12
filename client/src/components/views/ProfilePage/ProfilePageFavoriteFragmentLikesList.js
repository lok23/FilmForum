import React, { useEffect, useState } from 'react'
import {Row} from "antd";
import Title from "antd/es/typography/Title";
import axios from "axios";
import {API_KEY, IMAGE_BASE_URL, IMAGE_SIZE, NO_IMG, POSTER_SIZE} from "../../Config";
import ProfilePageFavoriteFragmentLikesItem from "./ProfilePageFavoriteFragmentLikesItem";

const ProfilePageFavoriteFragmentLikesList = (props) => {

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

    console.log("ProfilePageFavoriteFragmentLikesList likes: ", likes);

    return (
        <div>
            <Title level={2}>This user liked:</Title>
            <hr/>
            <Row gutter={[16, 16]}>
                {likes.map((page, index) => (
                    <React.Fragment key={index}>
                        <ProfilePageFavoriteFragmentLikesItem page={page}/>
                    </React.Fragment>
                ))}
            </Row>
            <br/>
        </div>
    )
}

export default ProfilePageFavoriteFragmentLikesList