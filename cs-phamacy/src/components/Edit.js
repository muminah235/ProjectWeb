import { useState ,response} from 'react';
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

    

    const updateCustomer = (User_ID) => {
        Axios.put("http://localhost:4001/update", {
            Username: newUsername || customerList,
            Password: newPassword || Password,
            User_fname: newName || User_fname,
            User_lname: newSurname || User_lname,
            User_birthday: newBirthDay || User_birthday,
            User_address: newAddress || User_address,
            User_tel: newTel || User_tel,
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
            /*ReactDOM.render(
                <Register />,
                document.getElementById('root')
            );*/


        })
    }
    const deleteCustomer = (User_ID) => {
        Axios.delete(`http://localhost:4001/delete/${User_ID}`).then((reponse) => {
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
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" defaultValue={val.Username}   style={{ width: "300px" }} className="form-control" onChange={(event) => {setNewUsername(event.target.value) }} />

                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password"  defaultValue={val.Password}  style={{ width: "300px" }} className="form-control" placeholder="Enter password" onChange={(event) => { setNewPassword(event.target.value) }} />

                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" defaultValue={val.User_fname} style={{ width: "300px" }} className="form-control" placeholder="Enter name" onChange={(event) => { setNewName(event.target.value) }} />
                    
                    <label htmlFor="surname" className="form-label">Surname</label>
                    <input type="text" defaultValue={val.User_lname}  style={{ width: "300px" }} className="form-control" placeholder="Enter surname" onChange={(event) => { setNewSurname(event.target.value) }} />

                    <label htmlFor="birthday" className="form-label">Birthday</label>
                    <input type="date" defaultValue={val.User_birthday}  style={{ width: "300px" }} className="form-control" placeholder="Enter birthday" onChange={(event) => { setNewBirthDay(event.target.value) }} />
            
                    <label htmlFor="address" className="form-label">Address</label>
                    <input type="text"  defaultValue={val.User_address}  style={{ width: "300px" }} className="form-control" onChange={(event) => { setNewAddress(event.target.value) }} />
                    
                    <label htmlFor="tel" className="form-label">Tel number</label>
                    <input type="tel"  defaultValue={val.User_tel}  style={{ width: "300px" }}  className="form-control" onChange={(event) => { setNewTel(event.target.value) }} />
                    
                
                    <button className="btn btn-warning" onClick={() => { updateCustomer(val.User_ID) }}>Update</button>
                    
                  </div>
                </div>
              </div>
            )
        
          })}
        </dir>
      
    )

}


//<button className="btn btn-danger" onClick={() => { deleteCustomer(val.User_ID) }}>Delete</button>