import Container from 'react-bootstrap/Container'
import { Row, Col, Form} from 'react-bootstrap';


function Payment(){
    return(
        <Container>
            <h2>ข้อมูลการชำระเงิน</h2>
            <Row>
                <Col xs={6}>ยอดชำระทั้งหมด</Col>
                <Col xs={6}>บาท</Col>
            </Row>
            <Row>
                <h4>หมายเลขบัญชีธนาคารของร้านค้า</h4>
                <Col xs={12}>ธนาคารไทยพาณิชย์ จำกัด (มหาชน)</Col>
                <Col xs={12}>ชื่อบัญชี : นางสาวนูรูลมุมีนะห์ เจ๊ะเด็ง</Col>
                <Col xs={12}>เลขที่บัญชี : 565-494736-1</Col>
            </Row>
            <Row>
                <Form.Group controlId="fromFile" className="mb-3">
                    <Form.Label>หลักฐานการโอน</Form.Label>
                    <Form.Control type="file" />
                </Form.Group><br/>
                
            </Row>

            <Row>
                <Col xs={6}></Col>
                <Col xs={6}><form>
                <button className="btn btn-success">ชำระเงิน</button>
                </form></Col>
            </Row>
        </Container>
    )
}
export default Payment;