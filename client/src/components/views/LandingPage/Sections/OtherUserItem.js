import React from 'react'
import { Card, Avatar, Col, Typography, Row } from 'antd';
import {Link} from "react-router-dom";


const OtherUserItem = (props) => {

    console.log("OtherUserItem props: ", props)

    return (
        <Col key={props.index} lg={6} md={8} xs={24}>
            <div style={{ position: 'relative' }}>
                {/* take us to the OtherProfilePage */}
                <Link to={{
                    pathname: `/profile/${props.user.email}`,
                    state: props.user.email}} >
                    {props.user.email}
                </Link>
            </div>
        </Col>
    )

}

export default OtherUserItem


// import React, { useEffect, useState } from 'react'
//
// function OtherUserItem(props) {
//     return (
//         <div>
//             {props.user}
//         </div>
//     )
// }
//
// export default OtherUserItem