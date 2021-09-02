import { useEffect, useState } from 'react';
import Axios from 'axios'


export default function Navbar() {

    const [SearchText, setSearchText] = useState('');
    const [SeachStatus, setSearchStatus] = useState('');

    useEffect(()=>{
        localStorage.setItem('seachtext', JSON.stringify(SearchText));
    })

    const seachtext = (e) => {
        e.preventDefault();
        Axios.post('http://localhost:4002/',{
            seachtext: Product_name
        }).then((response) => {
            if(response.data.message){
              setSeachStatus(response.data.message)
            }else{
              e.preventDefault();
              setSearchStatus(response.data[0].Product_name)
              alert("ไม่พบยาที่ต้องการ");
              e.preventDefault();
            }

            })
    }


    return (
        <div>
            <nav class = "navbar navbar-expand-lg navbar bg-light">
                    <ul class="navbar-nav">
                    <a class = "navbar-brand" href="/">CS Pharmacy</a>
                    <form class="d-flex">
                        <input 
                            class="form-control me-2" 
                            type="search" 
                            placeholder="ค้นหายา" 
                            aria-label="Search"
                            value={SearchText} 
                            onChange={(event) => { setSearchText(event.target.value) }}
                            />
                        <button class="btn btn-outline-success" type="submit" onClick={seachtext}>ค้นหา</button>
                    </form>

                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="/">แนะนำสินค้า</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="/">ติดตามสินค้า</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="/">ติดต่อเรา</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="/">ตะกร้าสินค้า</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="/login">ล็อกอิน</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="/admin">Admin</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="/profile">Profile</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="/cart">Cart</a>
                        </li>
                        

                    </ul>
                
            </nav>
        </div>
    );
}