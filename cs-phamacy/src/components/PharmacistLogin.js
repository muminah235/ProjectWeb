import { useState } from 'react';
import Axios from 'axios'
import ReactDOM from 'react-dom';

import Admin from './Admin';
import Pharmacist from './Pharmacist';
import Navbar from './Navbar';


export default function PharmacistLogin() {

    
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [LoginStatus, setLoginStatus] = useState("");
    const login = (e) => {
      e.preventDefault();
      Axios.post("http://localhost:4002/pharmalogin", {
        username: Username,
        password: Password,
      }).then((response) => {
        if(response.data.message){
          setLoginStatus(response.data.message)
        }else{
          e.preventDefault();
          setLoginStatus(response.data[0].Username)
          alert("login complete");
          ReactDOM.render(
            <Pharmacist/>,
          document.getElementById('root')
        );
        }
      })
    }
    return (
        <div className="">
            <h1>{LoginStatus}</h1>
            <center><h1>Pharma Login </h1></center>
            <form action="">
            <dir className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input type="text" className="form-control" placeholder="Enter username" onChange={(event) => { setUsername(event.target.value) }} />
            </dir>
            <dir className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" placeholder="Enter password" onChange={(event) => { setPassword(event.target.value) }} />
            </dir>
            
            <center><button className="btn btn-success" onClick={login}>Login</button></center>
            </form>
                
                
            
        </div> 
    );
}
