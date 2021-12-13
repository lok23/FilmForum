import React from 'react'
import { Typography } from 'antd';
import './MainImage.css'

const { Title } = Typography;

const MainImage = (props) => {
    return (
        <div
            style={{
                background:
                    `linear-gradient(to bottom, rgba(0,0,0,0)
            39%,rgba(0,0,0,0)
            41%,rgba(0,0,0,0.65)
            100%),
            url('${props.image}'), #1c1c1c`,
                height: '500px',
                backgroundSize: '100%, cover',
                backgroundPosition: 'center, center',
                width: '100%',
                position: 'relative'
            }}
        >
            <div>
                <div className="both-container" >
                    <Title style={{ color: 'white' }} level={2} > {props.title} </Title>
                    <p className="paragraphs-style"  >{props.text} </p>
                </div>
            </div>
        </div>
    )
}

export default MainImage
