import React, { useEffect, useState } from 'react'
import {Row} from "antd";
import Title from "antd/es/typography/Title";
import axios from "axios";

import {API_KEY, IMAGE_BASE_URL, IMAGE_SIZE, NO_IMG, POSTER_SIZE, USER_SERVER} from "../../Config";
import ProfilePageLikesItemFragment from "./ProfilePageLikesItemFragment";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";

const ProfilePageLikesListFragment = (props) => {

    const user = useSelector(state => state.user);

    const [likes, setLikes] = useState([]);

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
    }, [])

    console.log("peepee profileId: ", profileId);

    const variable = { userFrom: localStorage.getItem('userId') }


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
    }, [likes])

    console.log("ProfilePageLikesListFragment likes: ", likes);

    return (
        <div>
            <Title level={2}>You liked:</Title>
            <hr/>
            <Row gutter={[16, 16]}>
                {likes.map((page, index) => (
                    <React.Fragment key={index}>
                        <ProfilePageLikesItemFragment page={page}/>
                    </React.Fragment>
                ))}
            </Row>
            <br/>
        </div>
    )
}

export default ProfilePageLikesListFragment