import { Table } from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
import Axios from 'axios'
import React, { useEffect, useState } from 'react';

function OrderList() {

    const username = JSON.parse(localStorage.getItem("user"));
    const [order, setorder] = useState([]);
    const [product, setproduct] = useState([]);

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
    
    return(
        <div>
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
                            <td>{Val.receiveTime}</td>
                            <td>{Val.Order_status}</td>
                            </tr>
                            
                        </tbody>
                    </Table>
                    </Container>
            
                )
        })}
        </div>
    )
    
        
}

export default OrderList;
