import { useEffect, useState } from 'react';
import Axios from 'axios'
import ReactDOM from 'react-dom';

import CustomerScreen from '../screens/CustomerScreen'
import Navbar from '../components/Navbar';
import CustomerNavbar from "../components/CustomerNavbar"


export default function Login() {

    
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [LoginStatus, setLoginStatus] = useState("");
    const [UserID, setUserID] = useState("");
    const [UsernameLogin, setUsernameLogin] = useState(() => {
      const saveUsername = localStorage.getItem("user");
      console.log(saveUsername)
      if (saveUsername) {
          return JSON.parse(saveUsername);
      } else {
          return [];
      }
  });

    useEffect(()=>{
      localStorage.setItem('password', JSON.stringify(Password));
      localStorage.setItem('user',  JSON.stringify(Username));
    })

    const login = (e) => {
      e.preventDefault();
      Axios.post("http://localhost:4007/login", {
        username: Username,
        password: Password,
      }).then((response) => {
        if(response.data.message){
          setLoginStatus(response.data.message)
        }else{
          e.preventDefault();
          setLoginStatus(response.data[0].Username)
          alert("login complete");
          e.preventDefault();
          ReactDOM.render(
            <CustomerScreen />,
          document.getElementById('root')
          
        );
        
        }
      })
    }
    return (
        <div className="">
          {UsernameLogin===null ? <Navbar/>:<CustomerNavbar/>}
            <h1>{LoginStatus}</h1>
            <center><h1>Login form</h1></center>
            <form action="">
            <dir className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input type="text" className="form-control" placeholder="Enter username" onChange={(event) => { setUsername(event.target.value) }} />
            </dir>
            <dir className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" placeholder="Enter password" onChange={(event) => { setPassword(event.target.value) }} />
            </dir>
            <a class = "navbar-brand" href="/register">Register</a>
            <center><button className="btn btn-success" onClick={login}>Login</button></center>
            </form>
        </div> 
    );
}
