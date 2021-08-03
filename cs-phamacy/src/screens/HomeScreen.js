import React, { useEffect, useState } from 'react';
import Axios from 'axios'
import Navbar from '../components/Navbar';

export default function HomeScreens(){

    const [productsList,setProductsList] = useState([]);
    
    useEffect(()=>{
        const fecthData = async () =>{
            const {data} = await Axios.get('http://localhost:4002/showproduct');
            console.log(data);
            setProductsList(data);
            console.log("productsList");
            console.log(productsList);
        };
        fecthData();
    },[]);
    return(
        <div>
            <Navbar />
            <h1>Show product</h1>
            <div className="row center">
            {productsList.map((val) => {
            return(
                <div className="customer card">
                <div className="card-body terxt-left">
                  <p className="card-text">Product name:{val.Product_name}</p>
                  <p className="card-text">Product details:{val.Product_detail}</p>
                  <p className="card-text">Product price:{val.Product_price}</p>
                  <p className="card-text">Product image:{val.Product_image}</p>
                  <p className="card-text">Product status:{val.Product_status}</p>
                  <p className="card-text">Product flag:{val.Product_flag}</p>
                </div>
            </div>
            )
            })}
            
            
            </div>
            <div>
      </div>
        </div>
    ) 
    


}