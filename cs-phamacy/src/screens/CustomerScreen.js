import React, { useEffect, useState } from 'react';
import Axios from 'axios'
import CustomerNavbar from '../components/CustomerNavbar';
import Itemcard from "../components/Itemcard";
import Cart from "../components/Cart"
import { CartProvider } from "react-use-cart";
import jsxToString from "jsx-to-string";
import { useCart } from "react-use-cart";



export default function CustomerScreen(props) {
    const [SearchText, setSearchText] = useState('');
    const {addItem} = useCart();
    const {
        id,
        isEmpty,
        totalUniqueItems,
        items ,
        totalItems,
        cartTotal,
        updateItemQuantity,
        removeItem,
        emptyCart,
        setItems,
    } = useCart();
    const [cartList,setcartList] = useState([]);
    const [productsList, setProductsList] = useState([]);
    const [dataList, setDataList] = useState([]);
    const [UserID, setUserID] = useState("");
    const Username = JSON.parse(localStorage.getItem("user"));
    useEffect(() => {
        const fecthData = async () => {
            const { data } = await Axios.get('http://localhost:4007/showproduct');
            console.log("data");
            setProductsList(data);
            console.warn(data)
        };
        fecthData();
        const fecthCart = async () => {
            const { data } = await Axios.get(`http://localhost:4007/showcart/${Username}`);
            console.log("cart");
            setcartList(data);
            console.warn(data)
            
        };
        fecthCart();
        
        
        
         
    }, []);

    /*useEffect(() => {
        const fecthData = async () => {
            const { data } = await Axios.get('http://localhost:4007/showproduct');
            console.log("data");
            
            console.warn(data)
            for(let i = 0;i<data.length;i++){
                addItem(data[i]);
            }
        };
        fecthData();
    }, []);*/
    const [UsernameLogin, setUsernameLogin] = useState(() => {
        const saveUsername = localStorage.getItem("user");
        console.log(saveUsername)
        if (saveUsername) {
            return JSON.parse(saveUsername);
        } else {
            return [];
        }
    });

    /*useEffect((e) => {
        const fecthData = async () => {
            const { data } = await Axios.get('http://localhost:4007/test');
            console.log("data");
            setProductsList(data);
            console.log(data)
        };fecthData();
    }, []);*/

    /*useEffect((e) => {
        const fecthUserID = async (e) => {
            Axios.put('http://localhost:4007/userID', {
                username: UsernameLogin,
            }).then((response) => {
                console.log(response.data[0].User_ID);
                setUserID(response.data[0].User_ID);
                console.log("User_ID");
                console.log(UserID);
                localStorage.setItem('User_ID', JSON.stringify(UserID));
            });
        };
        fecthUserID();
       
        
    }, []);*/
    const fecthUserID = async (e) => {
        Axios.put('http://localhost:4007/userID', {
            username: UsernameLogin,
        }).then((response) => {
            console.log(response.data[0].User_ID);
            setUserID(response.data[0].User_ID);
            console.log("User_ID");
            console.log(UserID);
            localStorage.setItem('User_ID', JSON.stringify(UserID));
        });
    };
    fecthUserID();

    const searchtext = (e) => {
        const search = SearchText.replace(/\'/gi,'')
        console.log("search: "+ search)
        Axios.put('http://localhost:4007/search',{
            seachtext:  search
        }).then((response) => {
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

    /*const fecthCart = async (e) => {
        Axios.put('http://localhost:4007/cusCart', {
            username: UsernameLogin,
        }).then((response) => {
            console.log(response.data);

            for(let i=0;i<response.data.length;i++){
                console.log("proId: ");
                console.log(response.data[i].Id)
            }
        });
    };
    fecthCart();*/

    return (
        
        <CartProvider>
            <div>
                <CustomerNavbar />
                <dir>
                    <label htmlFor="search" className="form-label">ค้นหา</label>
                    <input type="text"  style={{ width: "300px" }} className="form-control" onChange={(event) => {setSearchText(event.target.value) }} />
                </dir>
                <button className="btn btn-warning" onClick={() =>  {searchtext(SearchText)} }>ค้นหา</button>
                <dir>
                <button className="btn btn-success" onClick={() =>  {head()} }>ปวดหัว</button>
                <button className="btn btn-success" onClick={() =>  {stomach()} }>ปวดท้อง</button>
                <button className="btn btn-success" onClick={() =>  {nasal()} }>ละลายเสมหะ</button>
                </dir>
                <section className="py-4 container">

                <h1 className="text-center mt-3">Show product</h1>
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