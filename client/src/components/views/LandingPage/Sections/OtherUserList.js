import React, { useEffect, useState } from 'react'
import OtherUserItem from "./OtherUserItem";
import {Row} from "antd";
import GridCard from "../../../commons/GridCards";
import {IMAGE_BASE_URL, POSTER_SIZE} from "../../../Config";
import Title from "antd/es/typography/Title";

const otherUsers = [1, 2, 3, 4, 5]

function OtherUserList(props) {
    return (
        <div style={{width: '85%', margin: '1rem auto'}}>

            <Title level={2}> Newest Users! </Title>
            <hr/>
            <Row gutter={[16, 16]}>
                {otherUsers && otherUsers.map((user, index) => (
                    <React.Fragment key={index}>
                        <OtherUserItem user={user}/>
                    </React.Fragment>
                ))}
            </Row>

        </div>
    )
}

export default OtherUserList

