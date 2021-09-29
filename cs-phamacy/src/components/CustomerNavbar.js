export default function CustomerNavbar() {
    return (
        <div>
            <nav class = "navbar navbar-expand-lg navbar bg-light">
                
                    
                    
                    <ul class="navbar-nav">
                    <a class = "navbar-brand" href="/">CS Pharmacy</a>
                    

                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="/">แนะนำสินค้า</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="/StatusOrder">ติดตามสินค้า</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="/">ติดต่อเรา</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="/cart">ตะกร้าสินค้า</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="/profile">ข้อมูลส่วนตัว</a>
                        </li><li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="/chat">แชท</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="/logout">ล็อกเอ้าท์</a>
                        </li>

                    </ul>
                
            </nav>
        </div>
    );
}