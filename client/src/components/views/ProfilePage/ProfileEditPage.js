import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {USER_SERVER} from "../../Config";
import {registerUser, saveProfile} from "../../../_actions/user_actions";

const ProfileEditPage = () => {

    const dispatch = useDispatch()

    const [name, setName] = useState();
    const [role, setRole] = useState();
    const [_id, setId] = useState();

    console.log("role: ", role);

    axios.defaults.withCredentials = true;
    useEffect(() => {
        // test role
        axios.get(`${USER_SERVER}/auth`).then((response) => {
            // this might not work, double check
            if (response.data.role === undefined) {
                alert("not logged in");
            } else {
                setName(response.data.name)
                setRole(response.data.role)
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
            role: role
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
        <div>
            PROFILE EDIT PAGE

            <div>
                <label htmlFor="email">Name</label>
                <input onChange={handleNameChange} value={name} size="30"/>
            </div>
            <div className="radio-btn-container">
                <label
                    className="radio-btn"
                    onClick={() => {
                        setRole(0);
                    }}
                >
                    <input
                        type="radio"
                        value={role}
                        name="role"
                        checked={role === 0}
                    />
                    User
                </label>
                <label
                    className="radio-btn"
                    onClick={() => {
                        setRole(1);
                    }}
                >
                    <input
                        type="radio"
                        value={role}
                        name="role"
                        checked={role === 1}
                    />
                    Premium User
                </label>
                <label
                    className="radio-btn"
                    onClick={() => {
                        setRole(2);
                    }}
                >
                    <input
                        type="radio"
                        value={role}
                        name="role"
                        checked={role === 2}
                    />
                    Admin
                </label>
            </div>
            <Link to="/profile">
                <button onClick={onSave}>Save</button>
            </Link>
        </div>
    );
}

export default ProfileEditPage;