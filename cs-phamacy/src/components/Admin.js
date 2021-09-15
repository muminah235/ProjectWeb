import { useState ,response} from 'react';
import Axios from 'axios'

import ReactDOM from 'react-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import { Link } from 'react-router-dom';

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
    const [customerEdit,setcustomerEdit] = useState([]);
    const [pharmaList, setPharmaList] = useState([]);
    
    const [showButton,setShowButton] = useState(false); 

    const now = new Date().toISOString().split("T")[0];

    const getCustomer = () => {
        Axios.get('http://localhost:4007/customer').then((response) => {
            setCustomerList(response.data);
            console.log(customerList);
            console.log(response);
        })
    }

    
    const editCustomer = (User_ID) => {
        Axios.put('http://localhost:4007/edit',{
            User_ID: User_ID
        }).then((response) => {
            setcustomerEdit(response.data);
            console.log("customerEdit: "+customerEdit);
            console.log(response);
            setShowButton(true)
        })
    }

    
    
    const updateCustomer = (User_ID) => {
        Axios.put("http://localhost:4007/update", {
            Username: newUsername || customerEdit[0].Username,
            
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
    const deleteCustomer = (User_ID) => {
        Axios.delete(`http://localhost:4007/delete/${User_ID}`).then((reponse) => {
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
        <a class = "navbar-brand" href="/showpharmacist">Show pharmacist</a>
        <a class = "navbar-brand" href="/showproduct">Show product</a>
        <a class = "navbar-brand" href="/addproduct">Add product</a>
        
          {customerList.map((val, key) => {
            return (
              <div className="customer card">
                <div className="card-body terxt-left ">
                  <p className="card-text">Username:{val.Username}</p>
                  <p className="card-text">Name:{val.User_fname}</p>
                  <p className="card-text">Surname:{val.User_lname}</p>
                  <p className="card-text">Birthday:{val.User_birthday}</p>
                  <p className="card-text">Address:{val.User_address}</p>
                  <p className="card-text">Tel number:{val.User_tel}</p>
                  <p className="card-text">Chat room:{val.Chat_room}</p>
                  
                  <div className="mb-3">
                    <fieldset >
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" defaultValue={val.Username} style={{ width: "300px" }} className="form-control" onChange={(event) => {setNewUsername(event.target.value) }} />

                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" defaultValue={val.User_fname} style={{ width: "300px" }} className="form-control" placeholder="Enter name" onChange={(event) => { setNewName(event.target.value) }} />
                    
                    <label htmlFor="surname" className="form-label">Surname</label>
                    <input type="text" defaultValue={val.User_lname}  style={{ width: "300px" }} className="form-control" placeholder="Enter surname" onChange={(event) => { setNewSurname(event.target.value) }} />

                    <label htmlFor="birthday" className="form-label">Birthday</label>
                    <input type="date"  defaultValue={val.User_birthday} max={now} style={{ width: "300px" }} className="form-control" placeholder="Enter birthday" onChange={(event) => { setNewBirthDay(event.target.value) }} />


                    <label htmlFor="address" className="form-label">Address</label>
                    <input type="text"  defaultValue={val.User_address}  style={{ width: "300px" }} className="form-control" onChange={(event) => { setNewAddress(event.target.value) }} />
                    
                    <label htmlFor="tel" className="form-label">Tel number</label>
                    <input type="tel"  defaultValue={val.User_tel}  style={{ width: "300px" }}  className="form-control" onChange={(event) => { setNewTel(event.target.value) }} />
                    </fieldset>
                    {!showButton ? (
                    <button className="btn btn-warning" onClick={() => { editCustomer(val.User_ID) } } >Edit</button>
                    ):
                    <div>
                    <button className="btn btn-warning" onClick={() => { updateCustomer(val.User_ID) }}>Update</button>
                    <button className="btn btn-danger" onClick={() => { deleteCustomer(val.User_ID) }}>Delete</button>
                    </div>
                    }
                    
                   
                    
                  </div>
                </div>
              </div>
            )
        
          })}
    
        </dir>
      
    )

}

                /*<div>
                        <DatePicker 
                        selected={newBirthDay}
                        onChange={date => setNewBirthDay(date)}
                        defaultValue={val.User_birthday}
                        maxDate={new Date()}
                        dateFormat="yyyy-MM-dd"
                        />
                    </div>*/
//<input type="date" defaultValue={val.User_birthday}  style={{ width: "300px" }} className="form-control" placeholder="Enter birthday" onChange={(event) => { setNewBirthDay(event.target.value) }} />
//<button className="btn btn-danger" onClick={() => { deleteCustomer(val.User_ID) }}>Delete</button>