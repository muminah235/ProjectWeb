import { useState ,response} from 'react';
import Axios from 'axios'
export default function ShowProduct() {
    const [newName, setNewName] = useState("");
    const [newDetail, setNewDetail] = useState("");
    const [newPrice, setNewPrice] = useState("");
    const [productList, setProductList] = useState([]);
    const [productEdit,setProductEdit] = useState([]);

    const getProduct = () => {
        Axios.get('http://localhost:4007/showproduct').then((response) => {
            setProductList(response.data);
            console.log(productList);
            console.log(response);
        })
    }
    const editProduct = (id) => {
        Axios.put('http://localhost:4007/productEdit',{
            Product_ID: id
        }).then((response) => {
            setProductEdit(response.data);
            console.log(productEdit);
            console.log(response);
        })
    }

    const updateProduct = (id) => {
        Axios.put("http://localhost:4007/updateProduct", {
            name: newName || productEdit[0].name,
            detail: newDetail || productEdit[0].detail,
            price: newPrice || productEdit[0].price,
            id: id
        })
        .then((response) => {
            alert("update");
            setProductList(
                productList.map((val) => {
                    return val.id == id ? {
                        name: newName || val.name,
                        detail: newDetail || val.detail,
                        price: newPrice || val.price,
                        id: id
                    } : val;
                })
            )


        })
    }

    const deleteProduct = (id) => {
        Axios.delete(`http://localhost:4007/deleteProduct/${id}`).then((reponse) => {
            setProductList(
                productList.filter((val) => {
                    return val.id != id;
                })
            )
        })
    }
    return(
        
        <dir className="pharmasict">
            <a class = "navbar-brand" href="/admin">back</a>
        <h1>Product</h1>
        <button className="btn btn-primary" onClick={getProduct}>Show Product</button>
        {productList.map((val,key)=>{
        return(
            <div className="customer card">
            <div className="card-body terxt-left">

              <p className="card-text">name:{val.name}</p>
              
              <p className="card-text">Detail:{val.detail}</p>
              <p className="card-text">Price:{val.price}</p>
            </div>
            <div className="mb-3">
                    <label htmlFor="username" className="form-label">Name</label>
                    <input type="text" defaultValue={val.name} style={{ width: "300px" }} className="form-control" onChange={(event) => {setNewName(event.target.value) }} />

                   
                    <label htmlFor="name" className="form-label">detail</label>
                    <input type="text" defaultValue={val.detail} style={{ width: "300px" }} className="form-control" placeholder="Enter name" onChange={(event) => { setNewDetail(event.target.value) }} />
                    
                    <label htmlFor="surname" className="form-label">Price</label>
                    <input type="number" defaultValue={val.price}  style={{ width: "300px" }} className="form-control" placeholder="Enter surname" onChange={(event) => { setNewPrice(event.target.value) }} />
                    <button className="btn btn-warning" onClick={() => { editProduct(val.id) }}>Edit</button>
                    <button className="btn btn-warning" onClick={() => { updateProduct(val.id) }}>Update</button>
                    <button className="btn btn-danger" onClick={() => { deleteProduct(val.id) }}>Delete</button>
                </div>
                
            </div>
            
        )
          
        })}
    </dir>
    )
    
}

/*<button className="btn btn-warning" onClick={() => { editProduct(val.Product_ID) }}>Edit</button>
                    <button className="btn btn-warning" onClick={() => { updateProduct(val.Product_ID) }}>Update</button>
                    <button className="btn btn-danger" onClick={() => { deleteProduct(val.Product_ID) }}>Delete</button>
                */