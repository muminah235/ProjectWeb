import { useState } from 'react';

export default function Login() {
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    return (
        <div className="App container">
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
            <center><button className="btn btn-success" >Login</button></center>
            </form>
            
                
                
            
        </div> 
    );
}
