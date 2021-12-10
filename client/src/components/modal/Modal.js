import React, { useState } from "react";
import "./Modal.css";

export default function Modal(props) {

    const toggleModal = () => {
        window.location.reload();
        localStorage.setItem("modalWasSeen", "true");
    };


    document.body.classList.add('active-modal')

    return (
        <>
            {(
                <div className="modal">
                    <div className="overlay"></div>
                    <div className="modal-content">
                        <h2>Privacy Policy</h2>
                        <p>
                            At MOVIEAPP, one of our main priorities is the privacy of our visitors.
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
                            Please press "Acknowledge" to continue.
                        </p>
                        <button className="close-modal" onClick={toggleModal}>
                            Acknowledge
                        </button>
                    </div>
                </div>

            )}
        </>
    );
}