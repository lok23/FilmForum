import React, { useState } from "react";
import {Link} from "react-router-dom";

const PrivacyPolicyPage = () => {

    return (
        <>
            <h1>Privacy Policy</h1>
            <p>
                At FILMFORUM, one of our main priorities is the privacy of our visitors.
                This Privacy Policy applies only to our online activities and is valid for visitors to our
                website with regards to the information that they shared and/or collect.
                By using our website, you hereby consent to our Privacy Policy and agree to its terms.
            </p>
            <p>
                We use the information we collect to provide, operate, and personalize our website.
                Like any other website, FILMFORUM uses 'cookies'. These cookies are used to store information
                including visitors' preferences, and the pages on the website that the visitor accessed or visited.
                In addition, FILMFORUM also uses localStorage to better enhance your user experience.
                FILMFORUM's Privacy Policy does not apply to third party advertisers or websites. FILMFORUM
                reserves the right to share aggregate user data with third parties, to improve your advert experience.
            </p>
            <p>
                This website uses TMDB API and properties.
            </p>
            <p>
                Please press "Acknowledge" to return to the home page.
            </p>
            <p>
                <button>
                    <Link to="/">
                        Acknowledge
                    </Link>
                </button>
            </p>
        </>
    );
}

export default PrivacyPolicyPage;