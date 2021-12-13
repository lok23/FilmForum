import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import axios from "axios";
import {API_KEY, API_URL, USER_SERVER} from "../../Config";
import {Link} from "react-router-dom";
import ProfilePageFavoriteFragment from "./ProfilePageFavoriteFragment";
import ProfilePageLikesListFragment from "./ProfilePageLikesListFragment";
import ProfilePageDislikesListFragment from "./ProfilePageDislikesListFragment";
import { Button } from '@material-ui/core';

const ProfilePage = () => {

    // wanted to use useSelector, but it's too fast and as a result user is undefined. :(
    const user = useSelector(state => state.user)

    // our work-around solution
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [trailersClicked, setTrailersClicked] = useState(0);
    const [commentsDeleted, setCommentsDeleted] = useState(0);

    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get(`${USER_SERVER}/auth`).then((response) => {
            if (response.data.role === undefined) {
                alert("not logged in");
            } else {
                setEmail(response.data.email)
                setName(response.data.name)
                setRole(response.data.role)
            }
        })

        let variable = { userFrom: localStorage.getItem('userId') }


        axios.post('/api/premium_user/getTrailersClick', variable)
            .then(response => {
                if (response.data.success) {
                    console.log("getTrailerClick");
                    console.log("getTrailerClick response.data: ", response.data);
                    setTrailersClicked(response.data.result.length);
                } else {
                    console.log("not premium user!")
                }
            })

        axios.post('/api/admin_user/getCommentsDeleted', variable)
            .then(response => {
                if (response.data.success) {
                    console.log("getCommentsDeleted");
                    console.log("getCommentsDeleted response.data: ", response.data);
                    setCommentsDeleted(response.data.result.length);
                } else {
                    console.log("not admin user!")
                }
            })

    }, [])

    // should refactor this lazy code as soon as possible
    let actualRole = "unknown";
    if (role == 0) {
        actualRole = "user"
    } else if (role == 1) {
        actualRole = "premium_user"
    } else {
        actualRole = "admin"
    }

    return (
        <div>
            <div style={{ width: '95%', margin: '1rem auto' }}>
                <h1>My profile page!</h1>
                <p>email: {email}</p>
                <p>name: {name}</p>
                <p>role: {actualRole}</p>
                {
                    role == 1 ?
                        <p>Number of trailers watched: {trailersClicked-1}</p>
                        : <span></span>
                }
                {
                    role == 2 ?
                        <p>Number of comments deleted: {commentsDeleted-1}</p>
                        : <span></span>
                }
                <Link to="profileEdit">
                    <Button variant="contained" color="primary">Edit Profile</Button>
                </Link>
                <ProfilePageFavoriteFragment/>
            </div>
            <div style={{ width: '95%', margin: '1rem auto' }}>
                <ProfilePageLikesListFragment/>
            </div>
            <div style={{ width: '95%', margin: '1rem auto' }}>
                <ProfilePageDislikesListFragment/>
            </div>
        </div>
    );
}

export default ProfilePage;