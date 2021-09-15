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
            const { data } = await Axios.get('http://localhost:4007/showproduct');
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
        const search = SearchText.replace(/\'/gi,'')
        console.log("search: "+ search)
        console.log("serach text: "+ SearchText)
        Axios.put('http://localhost:4007/search',{
            seachtext: search
        }).then((response) => {
           console.log(response)
           setProductsList(response.data)
        })
    }
    const allproduct = () =>{
        Axios.get('http://localhost:4007/showproduct').then((response) => {
           console.log(response)
           setProductsList(response.data)
        })
    }
    const head = () =>{
        Axios.put('http://localhost:4007/cat',{
            type: 1
        }).then((response) => {
           console.log(response)
           setProductsList(response.data)
        })
    }

    const stomach = () =>{
        Axios.put('http://localhost:4007/cat',{
            type: 2
        }).then((response) => {
           console.log(response)
           setProductsList(response.data)
        })
    }

    const nasal = () =>{
        Axios.put('http://localhost:4007/cat',{
            type: 3
        }).then((response) => {
           console.log(response)
           setProductsList(response.data)
        })
    }
    /*useEffect(() => {
        const fecthData = async () => {
            const { data } = await Axios.get('http://localhost:4007/test');
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
                <dir>
                <label htmlFor="search" className="form-label">หมวดหมู่: </label>
                </dir>
                <dir>
                <button className="btn btn-success" onClick={() =>  {allproduct()} }>ทั้งหมด</button>
                <button className="btn btn-success" onClick={() =>  {head()} }>ปวดหัว</button>
                <button className="btn btn-success" onClick={() =>  {stomach()} }>ปวดท้อง</button>
                <button className="btn btn-success" onClick={() =>  {nasal()} }>ละลายเสมหะ</button>
                </dir>
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
                                    Product_img={item.Product_img}
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