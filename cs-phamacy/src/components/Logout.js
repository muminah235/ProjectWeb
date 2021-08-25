import React, { useEffect, useState } from 'react';
import HomeScreens from '../screens/HomeScreen';
import ReactDOM from 'react-dom';
import App from '../App';
import Navbar from './Navbar';

import { Redirect } from 'react-router';
import Login from './Login';

export default function Logout() {

            


    const resetUsername = () => {
        localStorage.setItem('password', "");
        localStorage.setItem('user', null);
        localStorage.setItem('User_ID', "");
        ReactDOM.render(
            <HomeScreens/>,
        document.getElementById('root')
        );
    }
    return (
        <div>
            <h1>Are you sure</h1>
            <button className="btn btn-danger" onClick={() => { resetUsername() }}>Yes</button>
            <button className="btn btn-warning" onClick="/">No</button>
        </div>
    )

}