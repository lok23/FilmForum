import React from 'react'
import { Card, Avatar, Col, Typography, Row } from 'antd';
import { IMAGE_BASE_URL } from '../Config';
import {Link} from "react-router-dom";
import './ActorCards.css';

const ActorCards = (props) => {

    let { key, image, characterName } = props
    const POSTER_SIZE = "w154";

    return (
        <div className="movie">
            <div className="container-actor-cards">
                <img className="img-actor-cards" alt={characterName} src={`${IMAGE_BASE_URL}${POSTER_SIZE}${image}`} />
            </div>
        </div>
    )

}

export default ActorCards