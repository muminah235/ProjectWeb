import React, { useEffect, useState } from 'react';
import Axios from 'axios'
import CustomerNavbar from './CustomerNavbar';
import Navbar from './Navbar'


export default function Profile() {
    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newName, setNewName] = useState("");
    const [newSurname, setNewSurname] = useState("");
    const [newBirthDay, setNewBirthDay] = useState("");
    const [newAddress, setNewAddress] = useState("");
    const [newTel, setNewTel] = useState("");
    const [customerList, setCustomerList] = useState([]);
    const [customerEdit, setcustomerEdit] = useState([]);
    const now = new Date().toISOString().split("T")[0];

    const [UsernameLogin, setUsernameLogin] = useState(() => {
        const saveUsername = localStorage.getItem("user");
        console.log(saveUsername)
        if (saveUsername) {
            return JSON.parse(saveUsername);
        } else {
            return [];
        }
    });
    useEffect(() => {
        console.log("UsernameLogin: " + UsernameLogin);
        const fecthData = async () => {
            Axios.put('http://localhost:4002/profile', {
                username: UsernameLogin,
            }).then((response) => {
                console.log(response.data);
                setCustomerList(response.data);
                console.log("CustomerList");
                console.log(customerList);
            });
        };
        fecthData();
    }, []);

    const editCustomer = (User_ID) => {
        Axios.put('http://localhost:4002/edit',{
            User_ID: User_ID
        }).then((response) => {
            setcustomerEdit(response.data);
            console.log(customerEdit);
            console.log(response);
        })
    }

    const updateCustomer = (User_ID) => {
        Axios.put("http://localhost:4002/update", {
            Username: newUsername || customerEdit[0].Username,
            Password: newPassword || customerEdit[0].Password,
            User_fname: newName || customerEdit[0].User_fname,
            User_lname: newSurname || customerEdit[0].User_lname,
            User_birthday: newBirthDay || customerEdit[0].User_birthday,
            User_address: newAddress || customerEdit[0].User_address,
            User_tel: newTel || customerEdit[0].User_tel,
            User_ID: User_ID
        })
        .then((response) => {
            alert("update");
            setCustomerList(
                customerList.map((val) => {
                    return val.User_ID == User_ID ? {
                        Username: newUsername || val.Username,
                        Password: newPassword || val.Password,
                        User_fname: newName || val.User_fname,
                        User_lname: newSurname || val.User_lname,
                        User_birthday: newBirthDay || val.User_birthday,
                        User_address: newAddress || val.User_address,
                        User_tel: newTel || val.User_tel,
                        User_ID: User_ID
                    } : val;
                })
            )
        })
    }

    return (
        
        <div>
            {UsernameLogin===null ? <Navbar/>:<CustomerNavbar/>}
            <h1></h1>
            <div className="row center">
                {customerList.map((val) => {
                    return (
                        <div className="customer card">
                            <div className="card-body terxt-left">
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input type="text" defaultValue={val.Username} style={{ width: "300px" }} className="form-control" onChange={(event) => { setNewUsername(event.target.value) }} />

                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" defaultValue={val.Password} style={{ width: "300px" }} className="form-control" placeholder="Enter password" onChange={(event) => { setNewPassword(event.target.value) }} />

                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" defaultValue={val.User_fname} style={{ width: "300px" }} className="form-control" placeholder="Enter name" onChange={(event) => { setNewName(event.target.value) }} />

                                    <label htmlFor="surname" className="form-label">Surname</label>
                                    <input type="text" defaultValue={val.User_lname} style={{ width: "300px" }} className="form-control" placeholder="Enter surname" onChange={(event) => { setNewSurname(event.target.value) }} />

                                    <label htmlFor="birthday" className="form-label">Birthday</label>
                                    <input type="date" defaultValue={val.User_birthday} max={now} style={{ width: "300px" }} className="form-control" placeholder="Enter birthday" onChange={(event) => { setNewBirthDay(event.target.value) }} />


                                    <label htmlFor="address" className="form-label">Address</label>
                                    <input type="text" defaultValue={val.User_address} style={{ width: "300px" }} className="form-control" onChange={(event) => { setNewAddress(event.target.value) }} />

                                    <label htmlFor="tel" className="form-label">Tel number</label>
                                    <input type="tel" defaultValue={val.User_tel} style={{ width: "300px" }} className="form-control" onChange={(event) => { setNewTel(event.target.value) }} />

                                    <button className="btn btn-warning" onClick={() => { editCustomer(val.User_ID) }}>Edit</button>
                                    <button className="btn btn-warning" onClick={() => { updateCustomer(val.User_ID) }}>Update</button>

                                </div>
                            </div>
                        </div>
                    )
                })}


            </div>
        </div>
    )



}

/*<button className="btn btn-warning" onClick={() => { editCustomer(val.User_ID) }}>Edit</button>
                                    <button className="btn btn-warning" onClick={() => { updateCustomer(val.User_ID) }}>Update</button>
                                    <button className="btn btn-danger" onClick={() => { deleteCustomer(val.User_ID) }}>Delete</button>*/