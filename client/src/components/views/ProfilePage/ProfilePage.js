import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import axios from "axios";
import {API_KEY, API_URL, USER_SERVER} from "../../Config";
import {Link} from "react-router-dom";
import ProfilePageFavoriteFragment from "./ProfilePageFavoriteFragment";
import ProfilePageFavoriteFragmentLikesList from "./ProfilePageFavoriteFragmentLikesList";

const ProfilePage = () => {

    // wanted to use useSelector, but it's too fast and as a result user is undefined. :(
    // const user = useSelector(state => state.user)

    // our work-around solution
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    // apparently useful?
    axios.defaults.withCredentials = true;
    useEffect(() => {
        // test role
        axios.get(`${USER_SERVER}/auth`).then((response) => {
            // this might not work, double check
            if (response.data.role === undefined) {
                alert("not logged in");
            } else {
                setEmail(response.data.email)
                setName(response.data.name)
                setRole(response.data.role)
            }
        })
    }, [])

    // should refactor this lazy code as soon as possible
    let actualRole = "unknown";
    if (role == 0) {
        actualRole = "user"
    } else if (role == 1) {
        actualRole = "moderator"
    } else {
        actualRole = "admin"
    }

    return (
        <div>
            <div>
                <h2>My profile page!</h2>
                <p>email: {email}</p>
                <p>name: {name}</p>
                <p>role: {actualRole}</p>
                <Link to="profileEdit">
                    <button>Edit Profile</button>
                </Link>
                <ProfilePageFavoriteFragment/>
            </div>
            <div>
                <ProfilePageFavoriteFragmentLikesList/>
            </div>
        </div>
    );
}

export default ProfilePage;