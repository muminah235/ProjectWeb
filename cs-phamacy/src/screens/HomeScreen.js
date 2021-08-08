import React, { useEffect, useState } from 'react';
import Axios from 'axios'
import Navbar from '../components/Navbar';
import Itemcard from "../components/Itemcard";
import Cart from "../components/Cart"
import { CartProvider } from "react-use-cart";
import jsxToString from "jsx-to-string";

export default function HomeScreens(props){
    

    const [productsList,setProductsList] = useState([]);

    useEffect(()=>{
        const fecthData = async () =>{
            const {data} = await Axios.get('http://localhost:4002/showproduct');
            console.log(data);
            setProductsList(data);
        };
        fecthData();
    },[]);

    console.warn(productsList)

    return(
        <CartProvider>
        <div>
            <h1 className="text-center mt-3">Show product</h1>
            <section className="py-4 container">
                <div className="row justify-content-center">
                    {productsList.map((item,index)=>{
                        return(
                            <Itemcard 
                            id={item.Product_ID.toString()}
                            Product_name={item.Product_name} 
                            Product_detail={item.Product_detail}
                            Product_price={item.Product_price}
                            Product_status={item.Product_status}
                            Product_flag={item.Product_flag}
                            item={item}
                            key ={item.Product_ID}
                            />
                        )
                    })}
                    <Cart />
                </div>

            </section>
        </div>
        </CartProvider>
    ) 
    


}