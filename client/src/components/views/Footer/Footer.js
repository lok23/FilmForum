import React from 'react'
import {Icon} from 'antd';
import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <div style={{
            height: '80px', display: 'flex',
            flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', fontSize:'1rem'
        }}>
            <Link to="/privacyPolicyPage">Privacy Policy</Link>
        </div>
    )
}

export default Footer
