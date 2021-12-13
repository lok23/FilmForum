import React, { useEffect } from 'react';
import { auth } from '../_actions/user_actions';
import { useSelector, useDispatch } from "react-redux";

// We need to check our authentications
export default function (ComposedClass, reload) {
    function AuthenticationCheck(props) {

        let user = useSelector(state => state.user);
        const dispatch = useDispatch();

        useEffect(() => {
            // To know my current status, send auth request
            dispatch(auth()).then(async response => {
                // Not logged in Status
                if (!response.payload.isAuth) {
                    if (reload) {
                        props.history.push('/register_login')
                    }
                    //Loggined in Status
                } else {
                    if (reload === false) {
                        props.history.push('/')
                    }
                }
            })
            
        }, [dispatch, props.history])

        return (
            <ComposedClass {...props} user={user} />
        )
    }
    return AuthenticationCheck
}


