import React from 'react'
import { Card, Avatar, Col, Typography, Row } from 'antd';
import { IMAGE_BASE_URL } from '../Config';

function MovieCards(props) {

    let { key, image, movieId, movieName } = props

    return (
        <Col key={key} lg={6} md={8} xs={24}>
            <div style={{ position: 'relative' }}>
                {/* take us to the moviedetail page */}
                <a href={`/movie/${movieId}`} >
                    <img style={{ width: '100%', height: '320px' }} alt={movieName} src={image} />
                </a>
            </div>
        </Col>
    )

}

export default MovieCards