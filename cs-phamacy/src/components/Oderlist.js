import { Table } from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
import Axios from 'axios'
import React, { useEffect, useState } from 'react';
import { set } from 'react-hook-form';

function OrderList() {

    const username = JSON.parse(localStorage.getItem("user"));
    const [status,setStatus] = useState([]);
    const [order, setorder] = useState([]);
    const [product, setproduct] = useState([]);

    useEffect(() => {
        const fecthData = async (e) => {
            const { data } = await Axios.get(`http://localhost:4007/orderCus/${username}`);
            console.log("order");
            setorder(data);
            console.log(data)
        };
        fecthData();
        for(let i=0 ;i<order.length;i++){
            console.log(order[i].Order_status)
            if(order[i].Order_status === '2'){
                console.log("complete")
                setStatus([...status,{
                    Order_ID:order[i].Order_ID,
                    Tranfer:order[i].Tranfer,
                    completeTime:order[i].completeTime,
                    receiveTime:order[i].receiveTime,
                    Order_status:"complete"
                }])
            }
          
        }
        console.log("status")
        console.log(status)
        const fecthProduct = async () => {
            const { data } = await Axios.get(`http://localhost:4007/showcart2/${username}`);
            console.log("product");
            setproduct(data);
            console.log(data)
            
        };
        fecthProduct();
    }, []);
    
   
    return(
        <div>
        <h1>order</h1>
        {order.map((Val, key) =>{
                
            return(
                    
                    <Container><h4>ติดตามการสั่งซื้อ</h4><br/>
                    <p>หมายเหตุ : ประเภทการจัดส่ง 1:รับเองที่ร้าน 2:จัดส่งตามที่อยู่</p>
                   
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>Order ID</th>
                            <th>รายการสินค้า</th>
                            <th>ประเภทการจัดส่ง</th>
                            <th>เวลาที่สั่งซื้อ</th>
                            <th>เวลาที่ได้รับสินค้า</th>
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
