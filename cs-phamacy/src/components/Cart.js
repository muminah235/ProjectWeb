import React, { useEffect, useState } from 'react';
import { useCart } from "react-use-cart";
import { response } from 'react';
import Axios from 'axios'
import ReactDOM from 'react-dom';
import Login from './Login';
import Odetail from './Odetail';


const Cart = (props) => {
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
    /*useEffect(() => {
        const fecthCart = async () => {
            const { data } = await Axios.get(`http://localhost:4007/showcart/${Username}`);
            console.log("cart");
            setcartList(data);
            console.warn(data)
            for(let i = 0;i<data.length;i++){
                addItem(data[i]);
            }
            
        };
        fecthCart();
    }, []);*/

    ///เพิ่มค่า price
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
    localStorage.setItem('Cart_ID', "1");
    const [cartList,setcartList] = useState([]);
    const [customerList,setCustomerList] = useState([]);
    const [productID,setProductID] = useState("");
    const Username = JSON.parse(localStorage.getItem("user"));
    
    useEffect(() => {
        const fecthData = async () => {
            const { data } = await Axios.get(`http://localhost:4007/showcart/${Username}`);
            console.log("cart");
            setcartList(data);
            console.warn(data)
            for(let i = 0;i<data.length;i++){
                addItem(data[i],data[i].Cart_Amount);
            }
        };
        fecthData();
        

    }, []);

    
    const deleteCart = (itemID) =>{
        const Username = JSON.parse(localStorage.getItem("user"));
        console.log(Username);
        const Cart_ID = parseInt(localStorage.getItem("Cart_ID"));
        const saveUserID = localStorage.getItem("User_ID");
        const saveUsername = localStorage.getItem("user");
        const saveLastUserID = localStorage.getItem("lastUser_ID");
        for(let i = 0; i < cartList.length; i++){
            console.log(cartList[i]);
        }
        console.log("ID: "+itemID)
        if (saveLastUserID ===  saveUserID || (isEmpty === false)) {
            console.log("yes");
            const saveCartID = parseInt(localStorage.getItem("Cart_ID"));
            console.log(saveCartID)
            for(let i = 0; i < cartList.length; i++){
                console.log("Delete")
                if(itemID === parseInt(cartList[i].id)){
                    console.log("DELETE")
                    console.log(cartList[i])
                    Axios.put("http://localhost:4007/updateCart", {
                    Cart_id: saveCartID,
                    Product_id: cartList[i].id,
                    num: (parseInt(cartList[i].Cart_Amount) - 1),
                    }).then((response) => {
                        console.log(response);
                    })
                    const fecthData = async () => {
                        const { data } = await Axios.get(`http://localhost:4007/showcart/${Username}`);
                        console.log("cart");
                        setcartList(data);
                        console.warn(data)
                    };
                    fecthData();
                }
            }
            localStorage.setItem('lastUser_ID', saveUserID);
        }
    }

    const addtoCart = (itemID) =>{
        const Cart_ID = parseInt(localStorage.getItem("Cart_ID"));
        const saveUserID = localStorage.getItem("User_ID");
        const saveUsername = localStorage.getItem("user");
        const saveLastUserID = localStorage.getItem("lastUser_ID");
        for(let i = 0; i < cartList.length; i++){
            console.log(cartList[i]);
        }
        console.log("ID: "+itemID)
        if (saveLastUserID ===  saveUserID || (isEmpty === false)) {
            const Username = JSON.parse(localStorage.getItem("user"));
            console.log(Username);
            console.log("yes");
            const saveCartID = parseInt(localStorage.getItem("Cart_ID"));
            console.log(saveCartID)
            
            for(let i = 0; i < cartList.length; i++){
                if(parseInt(itemID) === parseInt(cartList[i].id)){
                    console.log("plus")
                    Axios.put("http://localhost:4007/updateCart", {
                    Cart_id: saveCartID,
                    Product_id: cartList[i].id,
                    num: (parseInt(cartList[i].Cart_Amount) + 1),
                    }).then((response) => {
                        console.log(response);
                    })
                    const fecthData = async () => {
                        const { data } = await Axios.get(`http://localhost:4007/showcart/${Username}`);
                        console.log("cart");
                        setcartList(data);
                        console.warn(data)
                    };
                    fecthData();
                }
            }
            localStorage.setItem('lastUser_ID', saveUserID);
        }
    }
    const removetoCart = (itemID) => {
        const Cart_ID = parseInt(localStorage.getItem("Cart_ID"));
        Axios.delete(`http://localhost:4007/deletetoCart/${itemID}/${Cart_ID}`).then((reponse) => {
            setcartList(
                cartList.filter((val) => {
                    return val.Product_ID != itemID;
                })
            )
        })
    }
    /*const removetoCart = (itemID) =>{
        const Cart_ID = parseInt(localStorage.getItem("Cart_ID"));
        const saveUserID = localStorage.getItem("User_ID");
        const saveUsername = localStorage.getItem("user");
        const saveLastUserID = localStorage.getItem("lastUser_ID");
        for(let i = 0; i < cartList.length; i++){
            console.log(cartList[i]);
        }
        console.log("ID: "+itemID)
        if (saveLastUserID ===  saveUserID || (isEmpty === false)) {
            console.log("yes");
            const saveCartID = parseInt(localStorage.getItem("Cart_ID"));
            console.log(saveCartID)
            for(let i = 0; i < cartList.length; i++){
                console.log("Delete")
                if(itemID === parseInt(cartList[i].Product_ID)){
                    console.log("DELETE")
                    console.log(cartList[i])
                    Axios.delete("http://localhost:4007/daletetoCart", {
                    Product_id: cartList[i].Product_ID,
                    
                    }).then((response) => {
                        console.log(response);
                    })
                    const fecthData = async () => {
                        const { data } = await Axios.get('http://localhost:4007/showcart');
                        console.log("cart");
                        setcartList(data);
                        console.warn(data)
                    };
                    fecthData();
                }
            }
            localStorage.setItem('lastUser_ID', saveUserID);
        }
    }*/
    
    //โค้ดเก่า
    /*const buynow = (user)=>{
        console.log(user)
        Axios.put('http://localhost:4007/orderCus',{
            Username: user
        }).then((response) => {
            setCustomerList(response.data);
            console.log(response);
        })
        const total = cartTotal;
        console.log(total)  
    }*/

    //โค้ดอัปเดตใหม่
    const BuyNow = (Username) => {
        Axios.put('http://localhost:4007/statusCart',{
            Username: Username,
            status: 2 
        }).then((response) => {
            console.log(response);
        })
        Axios.put('http://localhost:4007/BuyNow',{
            Username: Username
                }).then((response) => {
                    
                    console.log(response);

                    localStorage.setItem('name', JSON.stringify(response.data[0].User_fname));
                    localStorage.setItem('sername',  JSON.stringify(response.data[0].User_lname));
                    localStorage.setItem('address',  JSON.stringify(response.data[0].User_address));
                    localStorage.setItem('tel',  JSON.stringify(response.data[0].User_tel));
                    setCustomerList(response.data)
                    
                    console.log(response.data)
                }) 
                const total = cartTotal;
                console.log(total)
                const orderID = JSON.parse(localStorage.getItem("Cart_ID"));
                const now = new Date().toISOString().split("T")[0];
                if(total !== 0){
                    Axios.post('http://localhost:4007/orderCus',{
                        price: total,
                        Username: Username,
                        Oderstatus: 1,
                        Oderdate: now,
                        orderID: orderID,

                    }).then((response) => {
                        console.log(response);

                        //localStorage.setItem('total', JSON.stringify(response.data[0].Order_price));
                    })
                }
                ReactDOM.render(
                    <Odetail />,
                  document.getElementById('root')
                  
                );      
                   
    }
    
    return (
        <section className="py-4 container">
            <div className="row justify-content-center">
                <div className="col-12">
                    <h1>Cart ({totalUniqueItems}) Total Items: ({totalItems})</h1>
                    <table className="table table-light table-hover m-0">
                        <tbody>
                            {items.map((item, index) => {
                                return (
                                    <tr>
                                        <td>name:{item.name}</td>
                                        <td>detail:{item.detail}</td>
                                        <td>price:{item.price}</td>
                                        <td>qty: {item.quantity}</td>
                                        <td>
                                            <button className="btn btn-info ms-2" onClick={() => {updateItemQuantity(item.id, item.quantity - 1); deleteCart(item.id);}}>-</button>
                                            <button className="btn btn-info ms-2" onClick={() => {updateItemQuantity(item.id, item.quantity + 1); addtoCart(item.id);}}>+</button>
                                            <button className="btn btn-danger ms-2" onClick={() => {removeItem(item.id);removetoCart(item.id)}}>Remove</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="col-auto ms-auto">
                    <h2>total price: {cartTotal} ฿</h2>
                </div>
                <div className="col-auto ">
                    <button className="btn btn-danger m-2" onClick={() => emptyCart()}>Clear Cart</button>
                    <button className="btn btn-primary m-2" onClick={() => BuyNow(Username)}>Buy now</button>
                </div>
            </div>
        </section>
        
    );
}

export default Cart;