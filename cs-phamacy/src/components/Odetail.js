import React, { useEffect, useState } from 'react';
import { Row, Col, Form} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Axios from 'axios'

import { useCart } from "react-use-cart";

function Odetail({cartTotal}) {
    const name = JSON.parse(localStorage.getItem("name"));
    const sername = JSON.parse(localStorage.getItem("sername"));
    const address = JSON.parse(localStorage.getItem("address"));
    const tel = JSON.parse(localStorage.getItem("tel"));
    const username = JSON.parse(localStorage.getItem("user"));

    const [order, setorder] = useState([]);
    const [tranfer, setTranfer] = useState("");
    const [totalPrice, settotalPrice] = useState("");
    const [time, setTime] = useState("");

    const [slip,setSlipImg] = useState({
        file:[],
    })
    
    const handleInputChange = (event) =>{
        setSlipImg({
          ...slip,
          file:event.target.files[0],
    
        })
    }

    console.log(slip.file.name)

    const Buy = (e) => {
        const formData = new FormData()
        formData.append('slipImg',slip.file);
        Axios.post('http://localhost:4007/slip' ,formData,{
          headers:{"Content-type": "multipart/form-data"},
        }).then(res=>{
          e.preventDefault();
          console.warn(res);
        })
        Axios.put('http://localhost:4007/updateSlip' ,{
            img: "/slip/"+(slip.file.name),
            Order_pay: totalPrice,
            paytime: time,
            Tranfer: tranfer,
            completeTime: new Date(Date.now()).getHours() + 
                ":" +
                new Date(Date.now()).getMinutes(),
            Username: username,
            Order_Status:2 ,

            
          }).then(res=>{
            e.preventDefault();
            console.warn(res);
          })

    }

    const countTotal = () => {
        console.log(order[0].Order_price);
        settotalPrice(order[0].Order_price);
        setTranfer(1);
        
    };
    console.log(tranfer)

    const countDelivery = () => {
        console.log(order[0].Order_price);
        settotalPrice(order[0].Order_price+30);
        setTranfer(2);       
    };
    

    useEffect(() => {
        const fecthData = async () => {
            const { data } = await Axios.get(`http://localhost:4007/orderCus/${username}`);
            console.log("order");
            setorder(data);
            console.log(data)
            
        };
        fecthData();
    }, []);
    
    
    
    
    return(
        <Container>

                <Row>
                <h2>ข้อมูลการจัดส่ง</h2>
                <Col xs={6} >
                    <label htmlFor="name" className="form-label">Name : {name}</label>
                </Col>
                <Col xs={6}>
                    <label htmlFor="surname" className="form-label">Surname : {sername}</label>
                </Col>
                </Row>

                <Row>
                    <Col>
                    <label htmlFor="address" className="form-label">Address : {address}</label>
                    </Col>
                </Row>
                <Row>
                <Col>
                    <label htmlFor="tel" className="form-label">Tel number : {tel}</label>
                </Col>
                </Row>
                <a class="edit-map" href="/Map">เช็คพื้นที่การจัดส่ง</a>
        
            

            {order.map((Val, key) =>{
                    return (

                    <Row><h2>ข้อมูลการสั่งซื้อ</h2>
                        <Col xs={6}>ราคาสินค้า</Col>
                        <Col xs={6}> {Val.Order_price} บาท</Col>

                        <Col>เลือกวิธีการจัดส่ง</Col>
           
                        <div class="from-chek">
                            <input class="from-check-input" type="radio" name="paracel" id="store" value="store" onClick={countTotal} required/>
                            <label class="from-check-label" for="store" >รับเองที่ร้าน : 0 บาท</label>
                        </div>
                        <div class="from-chek">
                            <input class="from-check-input" type="radio" name="paracel" id="delivery" value="delivery" onClick={countDelivery}/>
                            <label class="from-check-label" for="delivery">จัดส่งตามที่อยู่ : 30 บาท</label>
                        </div>
                        <Col xs={6}>ยอดชำระทั้งหมด</Col>
                        <Col xs={6}> {totalPrice} บาท</Col>
                        <Col xs={6}></Col>
                        

                        <h2>ข้อมูลการชำระเงิน</h2>

                        <Col>หมายเลขบัญชีธนาคารของร้านค้า</Col>
                        <Col xs={12}>ธนาคารไทยพาณิชย์ จำกัด (มหาชน)</Col>
                        <Col xs={12}>ชื่อบัญชี : นางสาวนูรูลมุมีนะห์ เจ๊ะเด็ง</Col>
                        <Col xs={12}>เลขที่บัญชี : 565-494736-1</Col>

                        <Col xs={6}>
                        <dir className="mb-3">
                            <label htmlFor="image" className="form-label">หลักฐานการโอน</label>
                            <input type="file" className="form-control" placeholder="Enter image" onChange={(event)=>{setSlipImg(event.target.value)},handleInputChange}  />
                            <input type="time" className="" placeholder="" onChange={(event)=>{setTime(event.target.value)}}  />
                        </dir></Col>
                        

                        <br/>

                        <form>
                        <button className="btn btn-success" onClick={Buy}>สั่งสินค้า</button>
                        </form>
                    </Row>


                    
                    )
            })}
            
            
            

        </Container>
  
    )
}

export default Odetail;