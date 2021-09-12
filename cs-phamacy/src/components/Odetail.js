import React from 'react';
import { Row, Col} from 'react-bootstrap';
import Container from 'react-bootstrap/Container'

function Odetail() {
    return(
        <Container>

                <Row>
                <h2>ข้อมูลการจัดส่ง</h2>
                <Col xs={6} >
                    <label htmlFor="name" className="form-label">Name</label>
                </Col>
                <Col xs={6}>
                    <label htmlFor="surname" className="form-label">Surname</label>
                </Col>
                </Row>

                <Row>
                    <Col>
                    <label htmlFor="address" className="form-label">Address</label>
                    </Col>
                </Row>
                <Row>
                <Col>
                    <label htmlFor="tel" className="form-label">Tel number</label>
                </Col>
                </Row>
                <a class="edit-map" href="/Map">เช็คพื้นที่การจัดส่ง</a>
        
            <h2>ข้อมูลการสั่งซื้อ</h2>
            <Row>
                <Col xs={6}>ราคาสินค้า</Col>
                <Col xs={6}>บาท</Col>
            </Row>
            <Row>
                <Col>เลือกวิธีการจัดส่ง</Col>
           
                <div class="from-chek">
                    <input class="from-check-input" type="radio" name="paracel" id="store" value="store"/>
                    <label class="from-check-label" for="store">รับเองที่ร้าน</label>
                </div>
                <div class="from-chek">
                    <input class="from-check-input" type="radio" name="paracel" id="delivery" value="delivery"/>
                    <label class="from-check-label" for="delivery">จัดส่งตามที่อยู่</label>
                </div>
            </Row>
            <Row>
                <Col xs={6}>ยอดชำระทั้งหมด</Col>
                <Col xs={6}>บาท</Col>
            </Row>
            <Row>
                <Col xs={6}></Col>
                <Col xs={6}><form>
                <button className="btn btn-success" onClick={}>สั่งสินค้า</button>
                </form></Col>
            </Row>
            

        </Container>
  
    )
}

export default Odetail;