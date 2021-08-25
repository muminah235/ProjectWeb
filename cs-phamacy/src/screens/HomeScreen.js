import React, { useEffect, useState } from 'react';
import Axios from 'axios'
import Navbar from '../components/Navbar';
import Itemcard from "../components/Itemcard";
import Cart from "../components/Cart"
import { CartProvider } from "react-use-cart";
import jsxToString from "jsx-to-string";
import { useCart } from "react-use-cart";
import CustomerNavbar from "../components/CustomerNavbar"



export default function HomeScreens(props) {


    const [productsList, setProductsList] = useState([]);
    const [dataList, setDataList] = useState([]);
    const [UserID, setUserID] = useState("");

    useEffect(() => {
        const fecthData = async () => {
            const { data } = await Axios.get('http://localhost:4002/showproduct');
            console.log("data");
            setProductsList(data);
            console.warn(data)
        };
        fecthData();
    }, []);
    
    const [UsernameLogin, setUsernameLogin] = useState(() => {
        const saveUsername = localStorage.getItem("user");
        console.log(saveUsername)
        if (saveUsername) {
            return JSON.parse(saveUsername);
        } else {
            return [];
        }
    });

    /*useEffect(() => {
        const fecthData = async () => {
            const { data } = await Axios.get('http://localhost:4002/test');
            console.log("data");
            setProductsList(data);
            console.log(data)
        };
        fecthData();
        
    }, []);*/


    return (
        
        <CartProvider>
            {UsernameLogin===null ? <Navbar/>:<CustomerNavbar/>}
            <div>
                <section className="py-4 container">
                    <div className="row justify-content-center">
                        {productsList.map((item, idex) => {
                            return (
                                <Itemcard
                                    Product_name={item.name}
                                    Product_detail={item.detail}
                                    Product_price={item.price}
                                    Product_status={item.Product_status}
                                    Product_flag={item.Product_flag}
                                    item={item}
                                    key={idex}
                                />
                            )
                        })}
                    </div>
                    <Cart />
                </section>
            </div>
        </CartProvider>
    )



}

/*{productsList.map((item,idex)=>{
    return(
        <Itemcard
        id={item.Product_ID.toString()}
        Product_name={item.Product_name}
        Product_detail={item.Product_detail}
        Product_price={item.Product_price}
        Product_status={item.Product_status}
        Product_flag={item.Product_flag}
        item={item}
        key ={idex}
        />
    )
})}*/

/*{data.productData.map((item,idex)=>{
    return(
        <Itemcard
        Product_name={item.title}
        Product_detail={item.detail}
        Product_price={item.price}

        item={item}
        key ={idex}
        />
    )
})}*/