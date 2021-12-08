import React from 'react'
import { Card, Avatar, Col, Typography, Row } from 'antd';
import { IMAGE_BASE_URL } from '../Config';

const ActorCards = (props) => {

    let { key, image, characterName } = props
    const POSTER_SIZE = "w154";

    return (
        <Col key={key} lg={6} md={8} xs={24}>
            <div style={{ position: 'relative' }}>
                <img style={{ width: '100%', height: '320px' }} alt={characterName} src={`${IMAGE_BASE_URL}${POSTER_SIZE}${image}`} />
            </div>
        </Col>
    )


}

export default ActorCards