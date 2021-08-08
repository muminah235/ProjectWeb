import React, { useEffect, useState } from 'react';
import HomeScreens from '../screens/HomeScreen';
import ReactDOM from 'react-dom';
import App from '../App';
import Navbar from './Navbar';
import Screen from '../screens/Screen'

export default function Logout() {

            


    const resetUsername = () => {
        localStorage.setItem('password', "");
        localStorage.setItem('user', "");
        ReactDOM.render(
            <Screen />,
            document.getElementById('root')
        )
    }
    return (
        <div>
            <h1>Are you sure</h1>
            <button className="btn btn-danger" onClick={() => { resetUsername() }}>Yes</button>
            <button className="btn btn-warning" onClick="/">No</button>
        </div>
    )

}