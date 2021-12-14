import React, { useEffect, useState } from 'react'
import {Row} from "antd";
import Title from "antd/es/typography/Title";
import axios from "axios";

import {API_KEY, IMAGE_BASE_URL, IMAGE_SIZE, NO_IMG, POSTER_SIZE, USER_SERVER} from "../../Config";
import ProfilePageLikesItemFragment from "./ProfilePageLikesItemFragment";
import {useParams} from "react-router-dom";
import ProfilePageDislikesItemFragment from "./ProfilePageDislikesItemFragment";

const ProfilePageDislikesListFragment = (props) => {

    const [dislikes, setDislikes] = useState([]);

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
        axios.post('/api/like/getUserDislikes', variable)
            .then(response => {
                if (response.data.success) {
                    console.log("getUserDislikes response.data: ", response.data)
                    setDislikes(response.data.likes) // unfortunately named
                } else {
                    alert('Failed to get dislikes')
                }
            })
    }, [dislikes])

    console.log("ProfilePageDislikesListFragment dislikes: ", dislikes);

    return (
        <div>
            <Title level={2}>You disliked:</Title>
            <hr/>
            <Row gutter={[16, 16]}>
                {dislikes.map((page, index) => (
                    <div key={index}>
                        <ProfilePageDislikesItemFragment page={page}/>
                    </div>
                ))}
            </Row>
            <br/>
        </div>
    )
}

export default ProfilePageDislikesListFragment