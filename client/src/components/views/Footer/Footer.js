import React from 'react'
import {Link} from "react-router-dom";
import './Footer.css'

const Footer = () => {
    return (
        <div className="footer">
            <Link to="/privacyPolicyPage">Privacy Policy</Link>
        </div>
    )
}

export default Footer
