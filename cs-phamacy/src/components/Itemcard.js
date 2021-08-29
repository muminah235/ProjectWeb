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
    const [productID,setProductID] = useState("");
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
        
        
        
        if (saveUserID === "" || saveUsername === null) {
            ReactDOM.render(
                <Login />,
                document.getElementById('root')
            )
        } 
        
        
        if (saveLastUserID ===  saveUserID || (isEmpty === false)) {
            console.log("yes");
            const saveCartID = parseInt(localStorage.getItem("Cart_ID"));
            console.log(saveCartID)
            for(let i = 0; i < cartList.length; i++){
                console.log("cart list")
                if(props.Product_id === parseInt(cartList[i].Product_ID)){
                    console.log("cart list")
                    
                    Axios.put("http://localhost:4002/updateCart", {
                    Cart_id: saveCartID,
                    Product_id: cartList[i].Product_ID,
                    num: parseInt(cartList[i].Cart_Amount) + 1,
                    }).then((response) => {
                        console.log(response);
                    })
                    const fecthData = async () => {
                        const { data } = await Axios.get('http://localhost:4002/showcart');
                        console.log("cart");
                        setcartList(data);
                        console.warn(data)
                    };
                    fecthData();
                }
            }
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
                Product_ID: parseInt(props.Product_id),
                Cart_ID: Cart_ID,
                price: parseInt(props.Product_price),
                name: props.Product_name,
                num: 1,
            }).then((response) => {
                console.log(response);
            })
            const fecthData = async () => {
                const { data } = await Axios.get('http://localhost:4002/showcart');
                console.log("cart");
                setcartList(data);
                console.warn(data)
            };
            fecthData();
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
                        <p class="card-text">id: {props.Product_id}</p>
                        <a class="btn btn-success" onClick={()=>{addItem(props.item); order();}}>Add to cart</a>
                    </div>
            </div>
        </div>
                
    ) ;
}
export default Itemcard;