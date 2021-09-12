import React from 'react';
import { Table } from 'react-bootstrap';
import Container from 'react-bootstrap/Container'

function orderList() {
    return(
        <Container>
           <Table striped bordered hover>
            <tread>
                <tr>
                    <th class="text-center">หมายเลขออเดอร์</th>
                    <th class="text-center">รายการสินค้า</th>
                    <th class="text-center">ประเภทการจัดส่ง</th>
                    <th class="text-center">วันที่สั่งซื้อ</th>
                    <th class="text-center">วันที่ได้รับบสินค้า</th>
                    <th class="text-center">สถานะ</th> 
                </tr>
            </tread>
        </Table> 
        </Container>
  
    )
}

export default orderList;