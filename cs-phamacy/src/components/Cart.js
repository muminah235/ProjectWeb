import React from 'react';
import { useCart } from "react-use-cart";
import { useState, response } from 'react';
import Axios from 'axios'
import ReactDOM from 'react-dom';
import Login from './Login';


const Cart = (props) => {

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

    localStorage.setItem('Cart_ID', "1");

    const order = () => {
        const Cart_ID = parseInt(localStorage.getItem("Cart_ID"));
        const saveUserID = localStorage.getItem("User_ID");
        const saveUsername = localStorage.getItem("user");
        const saveLastUserID = localStorage.getItem("lastUser_ID");
        console.log(saveUserID);

       if (saveUserID !== "") {
                console.log("User: " + saveUserID);
                localStorage.setItem('Cart_ID', JSON.stringify(Cart_ID));
                const saveLastUserID = localStorage.getItem("lastUser_ID");
                console.log("lastUser: " + saveLastUserID);
                console.log("User: " + saveUserID);
        }
        if (saveLastUserID === saveUserID) {
                console.log("yes");
                const saveCartID = localStorage.getItem("Cart_ID");
                console.log(saveCartID)
                Axios.post('http://localhost:4002/addtocart', {
                    Cart_ID: saveCartID,
                    price: cartTotal,
                    num: totalItems,
                }).then((response) => {
                    console.log(response);
                })
                localStorage.setItem('lastUser_ID', saveUserID);
        }
        /*if (saveLastUserID !== saveUserID) {
                const Cart_ID = parseInt(localStorage.getItem("Cart_ID"));
                console.log(Cart_ID);
                const newCart_ID = Cart_ID + 1;
                console.log("newCart_ID" + newCart_ID)
                localStorage.setItem('Cart_ID', JSON.stringify(newCart_ID));
                localStorage.setItem('lastUser_ID', saveUserID);
            }*/


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
                                            <button className="btn btn-info ms-2" onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>-</button>
                                            <button className="btn btn-info ms-2" onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>+</button>
                                            <button className="btn btn-danger ms-2" onClick={() => removeItem(item.id)}>Remove</button>
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
                    <button className="btn btn-primary m-2" onClick={() => order()}>Buy now</button>
                </div>
            </div>
        </section>
        /*<div>
            {cartList.map((val) => {
                    return (
                        <h1>Name: {val.Product_name}</h1>
                    )
            })}
        </div>*/
    );
}

export default Cart;