
import { Table } from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
import Axios from 'axios'
import React, { useEffect, useState } from 'react';

function StatusOrder() {

    
    const [order, setorder] = useState([]);
    const [product, setproduct] = useState([]);
    const [time, setTime] = useState("");
    const [username, setUsername] = useState(""); 
    const [customerList, setCustomerList] = useState([]);
    const [customerEdit,setcustomerEdit] = useState([]);
    
    useEffect(() => {
        const fecthData = async () => {
            const { data } = await Axios.get(`http://localhost:4007/orderCus/${username}`);
            console.log("order");
            setorder(data);
            console.log(data)
            
        };
        fecthData();
        const fecthProduct = async () => {
            const { data } = await Axios.get(`http://localhost:4007/showcart/${username}`);
            console.log("product");
            setproduct(data);
            console.log(data)
            
        };
        fecthProduct();
    }, []);

    const getCustomer = () => {
        Axios.get('http://localhost:4007/customer').then((response) => {
            setCustomerList(response.data);
            console.log(customerList);
            console.log(response);
        })
    }

    
    const editCustomer = async (User_ID) => {
        setUsername(User_ID);
        console.log(username)
        const { data } = await Axios.get(`http://localhost:4007/orderCus/${username}`);
            console.log("order");
            setorder(data);
            console.log(data)
        /*Axios.put('http://localhost:4007/editStatus',{
            User_ID: User_ID
        }).then((response) => {
            setcustomerEdit(response.data);
            console.log("customerEdit: "+customerEdit);
            console.log(response);
            setUsername(response.data)
        })*/
    }

    const UpdateStatus = (e) => {
        Axios.put('http://localhost:4007/updateStatus' ,{
            time: time,
            username: username,
          }).then(res=>{
            console.warn(res);
          })
    }
    
    return(
        <div>
            <button className="btn btn-primary" onClick={getCustomer}>Show customer</button>
            
            {customerList.map((val, key) => {
            return (

              <div className="customer card">

                <div className="card-body terxt-left">
                  <p className="card-text" >Username: {val.Username}</p>
                  <button className="btn btn-warning" onClick={() => { editCustomer(val.Username) }}>Show Status</button>
                </div>


              </div>
            )

          })}
        {order.map((Val, key) =>{
                
            return(
                    
                    <Container><h4>ติดตามการสั่งซื้อ</h4>
                    
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>Order ID</th>
                            <th>รายการสินค้า</th>
                            <th>ประเภทการจัดส่ง</th>
                            <th>วันที่สั่งซื้อ</th>
                            <th>วันที่ได้รับสินค้า</th>
                            <th>สถานะ</th>
                            
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>{Val.Order_ID}</td>
                            <td>{product.map((Val,key)=>{
                                return (
                                    <div>
                                    {Val.name}
                                    </div>
                                    )
                            })}</td>
                            <td>{Val.Tranfer}</td>
                            <td>{Val.completeTime}</td>
                            <td> <input type="time" className="" placeholder="" onChange={(event)=>{setTime(event.target.value)}}  />
                            </td>
                            <td>{Val.Order_status}</td>
                            </tr>
                            <button className="btn btn-warning" onClick={() => { UpdateStatus(time) }}>Update Status</button>
                        </tbody>
                    </Table>
                    </Container>
            
                )
        })}
        </div>
    )
    
        
}

export default StatusOrder;