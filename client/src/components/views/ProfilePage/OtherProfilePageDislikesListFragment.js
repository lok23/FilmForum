import React, { useEffect, useState } from 'react'
import {Row} from "antd";
import Title from "antd/es/typography/Title";
import axios from "axios";
import {API_KEY, IMAGE_BASE_URL, IMAGE_SIZE, NO_IMG, POSTER_SIZE, USER_SERVER} from "../../Config";
import ProfilePageLikesItemFragment from "./ProfilePageLikesItemFragment";
import {useParams} from "react-router-dom";
import OtherProfilePageLikesItemFragment from "./OtherProfilePageLikesItemFragment";
import OtherProfilePageDislikesItemFragment from "./OtherProfilePageDislikesItemFragment";

const OtherProfilePageDislikesListFragment = (props) => {

    const params = useParams();
    console.log("PARAMS: ", params)

    const [profileId, setProfileId] = useState("");
    const [dislikes, setDislikes] = useState([]);

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

        axios.post('/api/like/getUserDislikes', variable)
            .then(response => {
                if (response.data.success) {
                    console.log("getUserDislikes response.data: ", response.data)
                    setDislikes(response.data.likes) // unfortunately named
                } else {
                    alert('Failed to get dislikes')
                }
            })
    }, [profileId])

    console.log("Other peepee profileId: ", profileId);

    const variable = {userFrom: profileId};

    console.log("OtherProfilePageLikesListFragment likes: ", dislikes);

    return (
        <div>
            <Title level={2}>This user disliked:</Title>
            <hr/>
            <Row gutter={[16, 16]}>
                {dislikes.map((page, index) => (
                    <React.Fragment key={index}>
                        <OtherProfilePageDislikesItemFragment page={page}/>
                    </React.Fragment>
                ))}
            </Row>
            <br/>
        </div>
    )
}

export default OtherProfilePageDislikesListFragment