import React, { useEffect, useState } from 'react';
import Axios from 'axios'
import Navbar from '../components/Navbar';
import Itemcard from "../components/Itemcard";
import Cart from "../components/Cart"
import { CartProvider } from "react-use-cart";
import jsxToString from "jsx-to-string";
import { useCart } from "react-use-cart";
import CustomerNavbar from "../components/CustomerNavbar"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'


export default function HomeScreens(props) {

    const [SearchText, setSearchText] = useState("");
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

    const searchtext = (searchtext) => {
        console.log(searchtext)
        Axios.put('http://localhost:4002/search',{
            seachtext: searchtext
        }).then((response) => {
           console.log(response)
           setProductsList(response.data)
        })
    }

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
                <dir>
                    <label htmlFor="search" className="form-label">ค้นหา</label>
                    <input type="text"  style={{ width: "300px" }} className="form-control" onChange={(event) => {setSearchText(event.target.value) }} />
                </dir>
                <button className="btn btn-warning" onClick={() =>  {searchtext(SearchText)} }>ค้นหา</button>
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
                                    Product_id={item.id}
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