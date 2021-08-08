import React from 'react';
import { useCart } from "react-use-cart";

const Itemcard = (props) => {
    const { addItem } = useCart();
    console.log(props.item);
    return (
        <div className ="col-11 col-md-6 col-lg-3 mx-0 mb-4">
            <div class="card p-0 overflow-hidden h-100 shadow" >
                <img src="" class="card-img-top img-fluid" />
                    <div class="card-body " >
                        <h5 class="card-title">name: {props.Product_name}</h5>
                        <p class="card-text">detail: {props.Product_detail}</p>
                        <p class="card-text">price: {props.Product_price} ฿</p>
                        <p class="card-text">status: {props.Product_status}</p>
                        <p class="card-text">flag: {props.Product_flag}</p>
                        <p class="card-text">id: {props.id}</p>
                        <a class="btn btn-success" onClick={()=>addItem(props.item)}>Add to cart</a>
                    </div>
            </div>
        </div>
                
           
    ) ;
}
export default Itemcard;