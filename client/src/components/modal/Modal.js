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
                            This website uses TMDB API and properties. This is our website's private policy.
                            We will be using localStorage and cookies to track your activities. Please press "Acknowledge" to continue.
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