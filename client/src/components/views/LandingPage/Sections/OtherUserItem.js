import React from 'react'
import { Card, Avatar, Col, Typography, Row } from 'antd';


function OtherUserItem(props) {

    console.log("OtherUserItem props: ", props)

    return (
        <Col key={props.index} lg={6} md={8} xs={24}>
            <div style={{ position: 'relative' }}>
                {/* take us to the moviedetail page */}
                <a href={`/profile/${props.user.email}`} >
                    {props.user.email}
                </a>
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