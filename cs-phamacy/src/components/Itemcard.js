import React, { useEffect, useState } from 'react';
import { useCart } from "react-use-cart";
import { response} from 'react';
import Axios from 'axios';
import ReactDOM from 'react-dom';
import Login from './Login';


const Itemcard = (props) => {
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
    const [cartList,setcartList] = useState([]);
    localStorage.setItem('Cart_ID', "1");

    useEffect(() => {
        const fecthData = async () => {
            const { data } = await Axios.get('http://localhost:4002/showcart');
            console.log("cart");
            setcartList(data);
            console.warn(data)
        };
        fecthData();
    }, []);
   
    
    
    const order = () => {
        const Cart_ID = parseInt(localStorage.getItem("Cart_ID"));
        const saveUserID = localStorage.getItem("User_ID");
        const saveUsername = localStorage.getItem("user");
        const saveLastUserID = localStorage.getItem("lastUser_ID");
        
        
        for (let i = 0; i < items.length; i++) {
            console.log(items[i]);
        }
        if (saveUserID === "" || saveUsername === null) {
            ReactDOM.render(
                <Login />,
                document.getElementById('root')
            )
        } 
        
        
        if (saveLastUserID ===  saveUserID ) {
            console.log("yes");
            const saveCartID = parseInt(localStorage.getItem("Cart_ID"));
            console.log(saveCartID)
            for(let i=0;i<cartList.length;i++){
                console.log("incart: ");
                console.log(cartList[i]);
                
                if(props.Product_id === parseInt(cartList[i].Cart_ID)){
                    Axios.put("http://localhost:4002/updateCart", {
                    Cart_id: saveCartID,
                    Product_id: cartList[i].Product_ID,
                    num: parseInt(cartList[i].Cart_Amount) + 1,
                    }).then((response) => {
                        console.log(response);
                    })
                }
            }
            
            /*if(saveCartID >=1){
                Axios.post('http://localhost:4002/ordera', {
                Product_ID: props.id,
                Cart_ID: saveCartID,
                price: props.Product_price,
                name: props.Product_name,
                num: 1,
            }).then((response) => {
                console.log(response);
            })
            }*/
            localStorage.setItem('lastUser_ID', saveUserID);
        }
        
        
        if ((saveLastUserID !== saveUserID) || (isEmpty === true)) {
            const Cart_ID = parseInt(localStorage.getItem("Cart_ID"));
            console.log(Cart_ID);
            const newCart_ID = Cart_ID + 1;
            console.log("newCart_ID" + newCart_ID)
            localStorage.setItem('Cart_ID', JSON.stringify(newCart_ID));
            localStorage.setItem('lastUser_ID', saveUserID);
            
            if(Cart_ID >=1){
                Axios.post('http://localhost:4002/order', {
                Product_ID: props.Product_id,
                Cart_ID: Cart_ID,
                price: parseInt(props.Product_price),
                name: props.Product_name,
                num: 1,
            }).then((response) => {
                console.log(response);
            })
            }
        }
        }
    /*const addtoDatabase = (e) => {
        Axios.post('http://localhost:4002/addTocart', {
        name: props.Product_name,
        detail: props.Product_detail,
        price : props.Product_price,
        status: props.Product_status,
        flag: props.Product_flag,
        id: props.id,
      }).then((response) => {
        console.log(response.data);
      })
    }*/
    /*const addItem = (id) => {
        Axios.put('http://localhost:4002/addToCart',{
            id: id
        }).then((response) => {
            setcartList(response.data);
            console.log("cartlist: "+cartList);
            console.log(response);
            localStorage.setItem('cart', JSON.stringify(cartList));
        })
    }*/
    
    return (
        <div className ="col-11 col-md-6 col-lg-3 mx-0 mb-4">
            <div class="card p-0 overflow-hidden h-100 shadow" >
                <img src="" class="card-img-top img-fluid" />
                    <div class="card-body " >
                        <h5 class="card-title">name: {props.Product_name}</h5>
                        <p class="card-text">detail: {props.Product_detail}</p>
                        <p class="card-text">price: {props.Product_price} ฿</p>
                        <p class="card-text">status: {props.Product_status}</p>
                        <a class="btn btn-success" onClick={()=>{addItem(props.item); order();}}>Add to cart</a>
                    </div>
            </div>
        </div>
                
    ) ;
}
export default Itemcard;