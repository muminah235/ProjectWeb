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
        Axios.get('http://localhost:4007/search',{
            seachtext: SearchText
        }).then((response) => {
           console.log(response)
        })
    }


    return (
        <div>
            <nav class = "navbar navbar-expand-lg navbar bg-light">
                
                    
                    <ul class="navbar-nav">
                    <a class = "navbar-brand" href="/">CS Pharmacy</a>
                    

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
                            <a class="nav-link active" aria-current="page" href="/cart">ตะกร้าสินค้า</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="/login">ล็อกอิน</a>
                        </li>
                        
                        
                        

                    </ul>
                
            </nav>
        </div>
    );
}
