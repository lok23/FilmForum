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
                pathname: `/profile/${props.favorited.userFrom.name}`,
                state: props.favorited.userFrom.name}} >
                {props.favorited.userFrom.name}
            </Link>
        </div>
    )

}

export default FavoritedUsers