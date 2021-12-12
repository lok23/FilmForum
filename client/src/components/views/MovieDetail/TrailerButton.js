import {Link} from "react-router-dom";
import React from "react";
import {Button} from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import axios from "axios";
import {useSelector} from "react-redux";

const TrailerButton = (props) => {

    const user = useSelector(state => state.user)

    const {role, trailer} = props;

    console.log("trailerbutton");

    const addToTrailersClicked = () => {
        console.log("addToTrailersClicked");

        const variables = {
            userFrom: user.userData._id,
        }

        axios.post('/api/premium_user/addTrailerClick', variables)
            .then(response => {
                if (response.data.success) {
                    console.log("saved addTrailerClick");
                } else {
                    alert('Failed to save Comment')
                }
            })
    }

    if (role === 1 && trailer !== "") {
        return (
            <Button
                onClick={addToTrailersClicked}
                variant="contained"
                startIcon={<YouTubeIcon/>}
                color="secondary"
                target="_blank"
                href={`http://www.youtube.com/watch?v=${trailer}`}
            >
                Click here to view the trailer!
            </Button>
        )
    } else if (trailer === "") {
        return (
            <Button
                disabled={true}
                variant="contained"
                startIcon={<YouTubeIcon/>}
                color="secondary"
            >
                This movie doesn't have a trailer
            </Button>
        )
    } else {
        return (
            <Button
                disabled={true}
                variant="contained"
                startIcon={<YouTubeIcon/>}
                color="secondary"
            >
                Become a premium member for access to trailers!
            </Button>
        )
    }
}

export default TrailerButton
