import React, {useEffect, useState} from "react";
import axios from "axios";
import {USER_SERVER} from "../../Config";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

// Only make the request if the property user in userData is defined.
// https://stackoverflow.com/questions/65980922/react-on-page-reload-receive-error-typeerror-cannot-read-property-x-of-undefi
function OtherProfilePage(props) {

    const user = useSelector(state => state.user)

    console.log("props: ", props)
    console.log("props.location.state", props.location.state)

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    // apparently useful?
    axios.defaults.withCredentials = true;
    useEffect(() => {
        // if logged in
        if (user.userData) {
            axios.get(`${USER_SERVER}/peepee/${props.location.state}`).then((response) => {
                console.log("response: ", response)
                if (response === undefined) {
                    alert("that profile doesn't exist!");
                } else {
                    setEmail(response.data.email)
                    setName(response.data.name)
                    setRole(response.data.role)
                }
            })
        }
    }, )

    // should refactor this lazy code as soon as possible
    let actualRole = "unknown";
    if (role == 0) {
        actualRole = "user"
    } else if (role == 1) {
        actualRole = "moderator"
    } else {
        actualRole = "admin"
    }

    console.log("user.userData: ", user.userData)
    console.log(email)

    // if (user.userData.email !== email) {
    //     return (
    //         <div>
    //             click here to go to your own profile!
    //         </div>
    //     )
    // }

    return (
        <div>
            {user.userData.email === email ?
                <div>
                    click here go to your profile!
                </div>
                :
            <div>
            Someone elses profile!
            <p>email: {email}</p>
            <p>name: {name}</p>
            <p>role: {actualRole}</p>
            </div>
                }
        </div>
    );
}

export default OtherProfilePage;