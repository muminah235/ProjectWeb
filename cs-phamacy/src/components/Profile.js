import React, { useEffect, useState } from 'react';
import Axios from 'axios'


export default function Profile() {
    const [customerList, setCustomerList] = useState([]);
    const [UsernameLogin,setUsernameLogin] = useState(()=>{
        const saveUsername = localStorage.getItem("user");
        console.log(saveUsername)
        if(saveUsername){
            return JSON.parse(saveUsername);
        }else{
            return [];
        }
        
    });
    useEffect(() => {
        console.log("UsernameLogin: "+ UsernameLogin);
        const fecthData = async () => {
            Axios.put('http://localhost:4002/profile',{
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
    return (
        <div>
            <h1></h1>
            <div className="row center">
                {customerList.map((val) => {
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
                            </div>
                        </div>
                    )
                })}


            </div>
        </div>
    )



}