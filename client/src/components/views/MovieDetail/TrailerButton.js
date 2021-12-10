import {Link} from "react-router-dom";
import React from "react";
import {Button} from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";

const TrailerButton = (props) => {

    const {role, trailer} = props;

    if (role === 1 && trailer !== "") {
        return (
            <Button
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
                disabled="true"
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
                disabled="true"
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
