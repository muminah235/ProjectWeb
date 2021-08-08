import { useState } from 'react';
import Axios from 'axios'
import LoginPage from './Login'
import ReactDOM from 'react-dom';

export default function AddProduct() {
  const [Product_name, setProductName] = useState("");
  const [Product_detail, setProductDetail] = useState("");
  const [Product_price, setProductPrice] = useState("");
  const [Product_img, setProductImg] = useState("");
  const [Product_status, setProductStatus] = useState("in stock");
  const [Product_flag, setProductFlag] = useState("1");
  const [Product_Type, setProductType] = useState("1");
  const [ProDuctList, setProductList] = useState([]);

  
  
  const addproduct = (e) => {
    e.preventDefault();
    Axios.post('http://localhost:4002/addproduct', {
      name: Product_name,
      detail: Product_detail,
      price: Product_price,
      image: Product_img,
      status: Product_status,
      flag: Product_flag,
      type:Product_Type
    }).then((response) => {
      e.preventDefault();
      console.log(response);
      alert("Add product complete")
    })
  }

  return (
    <div className="App container">
      <h1>Product</h1>
      <dir className="information">
        <form action="">
          <dir className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" placeholder="Enter Name" onChange={(event) => { setProductName(event.target.value) }} />
          </dir>
          <dir className="mb-3">
            <label htmlFor="detail" className="form-label">Detail</label>
            <input type="text" className="form-control" placeholder="Enter Detail" onChange={(event) => { setProductDetail(event.target.value) }} />
          </dir>
          <dir className="mb-3">
            <label htmlFor="price" className="form-label">Price</label>
            <input type="number" className="form-control" placeholder="Enter price" onChange={(event) => { setProductPrice(event.target.value) }} />
          </dir>
          <dir className="mb-3">
            <label htmlFor="image" className="form-label">Image</label>
            <input type="file" className="form-control" placeholder="Enter image" onChange={(event) => { setProductImg(event.target.files) }} />
          </dir>
          <dir className="mb-3">
            <label htmlFor="status" className="form-label">Status</label>
              <select class="form-select" aria-label="Default select example" onChange={(event) => { setProductStatus(event.target.value) }} >
                <option value="in stock">In stock</option>
                <option value="out stock">Out of stock</option>
              </select>
          </dir>
          <dir className="mb-3">
            <label htmlFor="flag" className="form-label">Flag</label>
              <select class="form-select" aria-label="Default select flag" onChange={(event) => { setProductFlag(event.target.value) }} >
                <option value="1">In list</option>
                <option value="2">Out list</option>
                </select>
          </dir>
          <dir className="mb-3">
            <label htmlFor="type" className="form-label">Type</label>
              <select class="form-select" aria-label="Default select flag" onChange={(event) => { setProductType(event.target.value) }} >
                <option value="1">headache medicine</option>
                <option value="2">stomach ache medicine</option>
                <option value="3">nasal decongestant</option>
                </select>
          </dir>



          <button className="btn btn-success" onClick={addproduct}>AddProduct</button>
        </form>
      </dir>




    </div>
  );
}
