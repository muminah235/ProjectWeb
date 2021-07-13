import { useState } from 'react';
import Axios from 'axios'

export default function Login() {
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [LoginStatus, setLoginStatus] = useState("");
    const login = () => {
      Axios.post('http://localhost:8080/login', {
        username: Username,
        password: Password,
      }).then((response) => {
        if(response.data.message){
          setLoginStatus(response.data.message);
        }else{
          setLoginStatus(response.data[0]);
        }
          
        });
    }
    return (
        <div className="App container">
          <h1>{LoginStatus}</h1>
            <center><h1>Login from</h1></center>
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
        <div>
          <h1>{LoginStatus}</h1>
        </div>
                
                
            
        </div> 
    );
}
