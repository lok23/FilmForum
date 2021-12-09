import React, { useEffect, useState } from 'react'
import OtherUserItem from "./OtherUserItem";
import {Row} from "antd";
import {IMAGE_BASE_URL, POSTER_SIZE} from "../../../Config";
import Title from "antd/es/typography/Title";
import axios from "axios";
import RecentPagesItem from "./RecentPagesItem";

const RecentPagesList = (props) => {

    const [recentPages, setRecentPages] = useState([]);

    let variable = { userFrom: localStorage.getItem('userId') }

    useEffect(() => {
        fetchAllRecentPages()
    }, [])

    const fetchAllRecentPages = () => {
        console.log("fetchAllRecentPages called");
        axios.post('/api/recent_pages/getRecentPages', variable)
            .then(response => {
                console.log("response: ", response.data.result);
                setRecentPages(response.data.result)
            })
    }

    console.log("recentPages: ", recentPages);

    return (
        <div>
            <Title level={2}> Recently checked out</Title>
            <hr/>
            <Row gutter={[16, 16]}>
                {recentPages.map((page, index) => (
                    <React.Fragment key={index}>
                        <RecentPagesItem page={page}/>
                    </React.Fragment>
                ))}
            </Row>
            <br/>
        </div>
    )
}

export default RecentPagesList