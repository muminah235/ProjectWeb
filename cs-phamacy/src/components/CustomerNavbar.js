export default function CustomerNavbar() {
    return (
        <div>
            <nav class = "navbar navbar-expand-lg navbar bg-light">
                
                    
                    
                    <ul class="navbar-nav">
                    <a class = "navbar-brand" href="/">CS Pharmacy</a>
                    <form class="d-flex">
                        <input class="form-control me-2" type="search" placeholder="ค้นหายา" aria-label="Search"></input>
                        <button class="btn btn-outline-success" type="submit">ค้นหา</button>
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

                    </ul>
                
            </nav>
        </div>
    );
}