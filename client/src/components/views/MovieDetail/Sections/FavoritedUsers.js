import React from 'react'
import { Card, Avatar, Col, Typography, Row } from 'antd';
import {Link} from "react-router-dom";


const FavoritedUsers = (props) => {

    let { favorited } = props

    console.log("props.favorited: ", props.favorited);

    console.log("OtherUserItem props: ", props)

    return (
        <div>
            {/* take us to the OtherProfilePage */}
            <Link to={{
                pathname: `/profile/${props.favorited.userFrom.email}`,
                state: props.favorited.userFrom.email}} >
                {props.favorited.userFrom.email}
            </Link>
        </div>
    )

}

export default FavoritedUsers