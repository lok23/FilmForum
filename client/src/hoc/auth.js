import React, { useEffect } from 'react';
import { auth } from '../_actions/user_actions';
import { useSelector, useDispatch } from "react-redux";

export default function (ComposedClass, reload, adminRoute = null) {
    function AuthenticationCheck(props) {

        let user = useSelector(state => state.user);
        const dispatch = useDispatch();

        useEffect(() => {
            // To know my current status, send auth request
            dispatch(auth()).then(async response => {
                // Not logged in Status
                if (await !response.payload.isAuth) {
                    if (reload) {
                        props.history.push('/register_login')
                    }
                    //Loggined in Status
                } else {
                    if (adminRoute && !response.payload.isAdmin) {
                        props.history.push('/')
                    }
                    else {
                        if (reload === false) {
                            props.history.push('/')
                        }
                    }
                }
            })
            
        }, [dispatch, props.history, user.googleAuth])

        return (
            <ComposedClass {...props} user={user} />
        )
    }
    return AuthenticationCheck
}


