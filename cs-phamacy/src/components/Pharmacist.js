import React, { useEffect, useState } from 'react';
import Axios from 'axios'
import { useCart } from "react-use-cart";
import ReactDOM from 'react-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import { Link } from 'react-router-dom';
import Cart from './Cart';

export default function Pharmacist() {
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
    

    const now = new Date().toISOString().split("T")[0];

    const [cartList,setcartList] = useState([]);
    const {addItem} = useCart();
    const {
        id,
        isEmpty,
        totalUniqueItems,
        items,
        totalItems,
        cartTotal,
        updateItemQuantity,
        removeItem,
        emptyCart,
    } = useCart();
   
    const getCustomer = () => {
        Axios.get('http://localhost:4002/customer').then((response) => {
            setCustomerList(response.data);
            console.log(customerList);
            console.log(response);
        })
    }

    const editCart = (User) => {
            
        
        Axios.put('http://localhost:4002/showcartPharma',{
            username: User
        }).then((response) => {
            setcartList(response.data);
            console.log("cartList: "+cartList);
            console.log(response.data);
            for(let i = 0;i<response.data.length;i++){
                addItem(response.data[i],response.data[i].Cart_Amount);
            }
        })
    }
    

    
    
    
    
    return (
        
        <dir className="customer">
        <h1>Pharmacist</h1>
        <button className="btn btn-primary" onClick={getCustomer}>Show customer</button>
        <a class = "navbar-brand" href="/showpharmacist">Show pharmacist</a>
        <a class = "navbar-brand" href="/addproduct">Add product</a>
        
          {customerList.map((val, key) => {
            return (
                
              <div className="customer card">
                <div className="card-body terxt-left">
                  <p className="card-text" >Username: {val.Username}</p>
                  <button className="btn btn-warning" onClick={() => { editCart(val.Username) }}>Edit cart</button>
                </div>
                <Cart/>
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