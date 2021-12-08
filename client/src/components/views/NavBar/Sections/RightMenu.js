/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import {Link, withRouter} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {logoutUser, registerUser} from "../../../../_actions/user_actions";

const RightMenu = (props) => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch();


  const logoutHandler = () => {
      console.log("user: ", user)
    dispatch(logoutUser()).then(response => {
      if (response.payload.success) {
        props.history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };

  // You will only see this if you are not logged in
  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <Link to="/login">Signin</Link>
        </Menu.Item>
        <Menu.Item key="app">
          <Link to="/register">Signup</Link>
        </Menu.Item>
      </Menu>
    )
  } else {
      // You will only see this if you are logged in
      return (
      <Menu mode={props.mode}>
        <Menu.Item key="logout">
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>
      </Menu>
    )
  }
}

export default withRouter(RightMenu);

