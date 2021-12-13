import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {USER_SERVER} from "../../Config";
import {registerUser, saveProfile} from "../../../_actions/user_actions";
import { Button } from '@material-ui/core';

const ProfileEditPage = () => {

    const dispatch = useDispatch()

    const [name, setName] = useState();
    const [_id, setId] = useState();


    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get(`${USER_SERVER}/auth`).then((response) => {
            // this might not work, double check
            if (response.data.role === undefined) {
                alert("not logged in");
            } else {
                setName(response.data.name)
                setId(response.data._id)
            }
        })
    }, [])

    const handleNameChange = (event) => {
        const newName = event.target.value;
        console.log("handleNameChange: ", newName);
        setName(newName);
    }

    function onSave() {
        let dataToSubmit = {
            _id: _id,
            name: name,
        }
        console.log(dataToSubmit)
        dispatch(saveProfile(dataToSubmit)).then(response => {
            if (response.payload.success) {
                alert("profile saved!")
            } else {
                alert(response.payload.err)
            }
        })
    }

    return (
        <div style={{ width: '95%', margin: '1rem auto' }}>
            <h1>PROFILE EDIT PAGE</h1>

            <div>
                <label htmlFor="email">Name</label>
                <input style={{marginLeft: '10px'}} onChange={handleNameChange} value={name} size="30"/>
            </div>
            <div style={{marginTop: '20px'}}>
                <Link to="/profile">
                    <Button variant="contained" color="primary" onClick={onSave}>Save</Button>
                </Link>
            </div>
        </div>
    );
}

export default ProfileEditPage;