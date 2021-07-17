import { useState } from 'react';
import Axios from 'axios'
import Register from './Register'
import ReactDOM from 'react-dom';


export default function Admin() {
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [User_fname, setUser_fname] = useState("");
    const [User_lname, setUser_lname] = useState("");
    const [User_birthday, setUser_birthday] = useState("");
    const [User_address, setUser_address] = useState("");
    const [User_tel, setUser_tel] = useState("");

    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newName, setNewName] = useState("");
    const [newSurname, setNewSurname] = useState("");
    const [newBirthDay, setNewBirthDay] = useState("");
    const [newAddress, setNewAddress] = useState("");
    const [newTel, setNewTel] = useState("");
    const [customerList, setCustomerList] = useState([]);

    const getCustomer = () => {
        Axios.get('http://localhost:8080/customer').then((response) => {
            setCustomerList(response.data);
            console.log(response)
        });
    }

    const updateCustomer = (User_ID) => {
        Axios.put("http://localhost:8080/update", {
            Username: newUsername,
            Password: newPassword,
            User_fname: newName,
            User_lname: newSurname,
            User_birthday: newBirthDay,
            User_address: newAddress,
            User_tel: newTel,
            User_ID: User_ID,
        }).then((response) => {
            alert("update");
            setCustomerList(
                customerList.map((val) => {
                    return val.User_ID == User_ID ? {
                        User_ID: val.User_ID,
                        Username: newUsername,
                        Password: newPassword,
                        User_fname: newName,
                        User_lname: newSurname,
                        User_birthday: newBirthDay,
                        User_address: newAddress,
                        User_tel: newTel
                    } : val;
                })
            )
            /*ReactDOM.render(
                <Register />,
                document.getElementById('root')
            );*/


        })
    }
    const deleteCustomerTel = (User_ID) => {
        Axios.delete(`http://localhost:8080/delete/${User_ID}`).then((reponse) => {
            setCustomerList(
                customerList.filter((val) => {
                    return val.User_ID != User_ID;
                })
            )
        })
    }
    return (

        <dir className="customer">
            <h1>Admin</h1>
            <button className="btn btn-primary" onClick={getCustomer}>Show customer</button>
            {customerList.map((val, key) => {
                return (
                    <div className="customer card">
                        <div className="card-body terxt-left">
                            <p className="card-text">Username:{val.Username}</p>
                            <p className="card-text">Password:{val.Password}</p>
                            <p className="card-text">Name:{val.User_fname}</p>
                            <p className="card-text">Surname:{val.User_lname}</p>
                            <p className="card-text">Birthday:{val.User_birthday}</p>
                            <p className="card-text">Address:{val.User_address}</p>
                            <p className="card-text">Tel number:{val.User_tel}</p>
                            <div className="information">
                                <h1>Edit</h1>
                                <dir className="mb-3">
                                    <label htmlFor="username" className="form-label">Username:</label>
                                    <input defaultValue={val.Username} type="text" style={{ width: "300px" }} placeholder="Username" className="form-control"
                                        onChange={(event) => {
                                            if(event.target === null){
                                                setNewUsername(val.Username)
                                            }else{
                                                setNewUsername(event.target.value)
                                            }
                                        }} />
                                </dir>
                                <dir className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input defaultValue={val.Password} type="password" style={{ width: "300px" }} placeholder="Password" className="form-control"
                                        onChange={(event) => {
                                            if(null){
                                                setNewPassword(val.Password)
                                            }else{
                                                setNewPassword(event.target.value)
                                            }
                                        }} />
                                </dir>
                                <dir>
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input defaultValue={val.User_fname} type="text" style={{ width: "300px" }} placeholder="Name" className="form-control" onChange={(event) => { setNewName(event.target.value) }} />
                                </dir>
                                <dir>
                                    <label htmlFor="surname" className="form-label">Surname</label>
                                    <input defaultValue={val.User_lname} type="text" style={{ width: "300px" }} placeholder="Surname" className="form-control" onChange={(event) => { setNewSurname(event.target.value) }} />
                                </dir>
                                <dir>
                                    <label htmlFor="birthday" className="form-label">Birthday</label>
                                    <input defaultValue={val.User_birthday} type="date" style={{ width: "300px" }} className="form-control" onChange={(event) => { setNewBirthDay(event.target.value) }} />
                                </dir>
                                <dir>
                                    <label htmlFor="address" className="form-label">Address</label>
                                    <input defaultValue={val.User_address} type="text" style={{ width: "300px" }} placeholder="Address" className="form-control" onChange={(event) => { setNewAddress(event.target.value) }} />
                                </dir>
                                <dir>
                                    <label htmlFor="tel" className="form-label">Tel number</label>
                                    <input defaultValue={val.User_tel} type="tel" style={{ width: "300px" }} placeholder="Tel number" className="form-control" onChange={(event) => { setNewTel(event.target.value) }} />
                                </dir>
                                <button className="btn btn-warning" onClick={() => { updateCustomer(val.User_ID) }}>Update</button>
                                <button className="btn btn-danger" onClick={() => { deleteCustomerTel(val.User_ID) }}>Delete</button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </dir>
    )

}