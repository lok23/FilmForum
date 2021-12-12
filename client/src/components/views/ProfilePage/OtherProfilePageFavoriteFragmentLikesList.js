import React, { useEffect, useState } from 'react'
import {Row} from "antd";
import Title from "antd/es/typography/Title";
import axios from "axios";
import {API_KEY, IMAGE_BASE_URL, IMAGE_SIZE, NO_IMG, POSTER_SIZE, USER_SERVER} from "../../Config";
import ProfilePageFavoriteFragmentLikesItem from "./ProfilePageFavoriteFragmentLikesItem";
import {useParams} from "react-router-dom";

const OtherProfilePageFavoriteFragmentLikesList = (props) => {

    const params = useParams();
    console.log("PARAMS: ", params)

    const [profileId, setProfileId] = useState("");
    const [likes, setLikes] = useState([]);

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

        axios.post('/api/like/getUserLikes', variable)
            .then(response => {
                if (response.data.success) {
                    console.log("getUserLikes response.data: ", response.data)
                    setLikes(response.data.likes)
                } else {
                    alert('Failed to get likes')
                }
            })
    }, [profileId])

    console.log("Other peepee profileId: ", profileId);

    const variable = {userFrom: profileId};

    console.log("OtherProfilePageFavoriteFragmentLikesList likes: ", likes);

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

export default OtherProfilePageFavoriteFragmentLikesList