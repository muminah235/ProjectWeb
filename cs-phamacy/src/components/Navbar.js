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
        Axios.get('http://localhost:4002/search',{
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
