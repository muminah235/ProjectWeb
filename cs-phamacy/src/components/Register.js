import { useState } from 'react';
import Axios from 'axios'
import LoginPage from './Login'
import ReactDOM from 'react-dom';

export default function Register() {
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [PasswordConfirm, setPasswordConfirm] = useState("");
    const [User_fname, setUser_fname] = useState("");
    const [User_lname, setUser_lname] = useState("");
    const [User_birthday, setUser_birthday] = useState("");
    const [User_address, setUser_address] = useState("");
    const [User_tel, setUser_tel] = useState("");
    const [customerList, setCustomerList] = useState([]);
    const [registerStatus, setRegisterStatus] = useState("");

    const register = (e) => {
      e.preventDefault();
      Axios.post('http://localhost:4002/register', {
        username: Username,
        password: Password,
        PasswordConfirm : PasswordConfirm,
        name: User_fname,
        surname: User_lname,
        birthday: User_birthday,
        address: User_address,
        tel: User_tel
      }).then((response) => {
        e.preventDefault();
        console.log(response);
        if(response.data.message){
          setRegisterStatus(response.data.message)
          console.log(response);
        }
        e.preventDefault();
      })
    }

    return (

        <div className="">
        <h1>{registerStatus}</h1>
        <h1>Register</h1>
        <dir className="information"> 
          <form action="">
            <dir className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input type="text" className="form-control" placeholder="Enter username" onChange={(event) => { setUsername(event.target.value) }} />
            </dir>
            <dir className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" placeholder="Enter password" onChange={(event) => { setPassword(event.target.value) }} />
            </dir>
            <dir className="mb-3">
              <label htmlFor="PasswordConfirm" className="form-label">Confirm Password</label>
              <input type="password" className="form-control" placeholder="Enter password" onChange={(event) => { setPasswordConfirm(event.target.value) }} />
            </dir>
            <dir className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" placeholder="Enter name" onChange={(event) => { setUser_fname(event.target.value) }} />
            </dir>
            <dir className="mb-3">
              <label htmlFor="surname" className="form-label">Surname</label>
              <input type="text" className="form-control" placeholder="Enter surname" onChange={(event) => { setUser_lname(event.target.value) }} />
            </dir>
            <dir className="mb-3">
              <label htmlFor="birthday" className="form-label">Birthday</label>
              <input type="date" className="form-control" placeholder="Enter birthday" onChange={(event) => { setUser_birthday(event.target.value) }} />
            </dir>
            <dir className="mb-3">
              <label htmlFor="address" className="form-label">Address</label>
              <input type="text" className="form-control" placeholder="Enter address" onChange={(event) => { setUser_address(event.target.value) }} />
            </dir>
            <dir className="mb-3">
              <label htmlFor="tel" className="form-label">Tel number</label>
              <input type="tel" className="form-control" placeholder="Enter tel number" onChange={(event) => { setUser_tel(event.target.value) }} />
            </dir>
            <button className="btn btn-success" onClick={register}>Register</button>
          </form>
        </dir>
        
                
                
        
        </div> 
    );
}
