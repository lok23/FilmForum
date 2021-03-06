import React, { useEffect, useState } from 'react'
import OtherUserItem from "./OtherUserItem";
import {Row} from "antd";
import {IMAGE_BASE_URL, POSTER_SIZE} from "../../../Config";
import Title from "antd/es/typography/Title";
import axios from "axios";

const OtherUserList = (props) => {

    const [otherUsers, setOtherUsers] = useState([]);

    useEffect(() => {
        fetchAllUsers()
    }, [])

    const fetchAllUsers = () => {
        axios.get('/api/users/allUsers')
            .then(response => {
                    console.log(response.data)
                    setOtherUsers(response.data)
            })
    }

    return (
        <div>
            <Title level={2}> Newest Users! (Click to view their user profile)</Title>
            <hr/>
            <Row gutter={[16, 16]}>
                {otherUsers.map((user, index) => (
                    <React.Fragment key={index}>
                        <OtherUserItem user={user}/>
                    </React.Fragment>
                ))}
            </Row>
            <br/>
        </div>
    )
}

export default OtherUserList

