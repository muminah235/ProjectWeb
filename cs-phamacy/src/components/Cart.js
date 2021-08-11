import React from 'react';
import { useCart } from "react-use-cart";
import { useState, response } from 'react';
import Axios from 'axios'
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

    const order = () => {
        Axios.post('http://localhost:4002/order', {
            price: cartTotal,
            num: totalItems,
        }).then((response) => {
            console.log(response);
        })
    }
    console.warn(items);
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