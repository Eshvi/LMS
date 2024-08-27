import { Link } from "react-router-dom";

export default function Header() {
    return <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" >Eshvi's Project</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to={"/product"} className="nav-link active" aria-current="page" >Products</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/reward"} className="nav-link" >Reward</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/catalog"} className="nav-link" >Reward Catalog</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/redeem"} className="nav-link" >Redeem Rewards</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/"} onClick={() => sessionStorage.clear()} className="nav-link" >Logout</Link>
                        </li>
                    </ul>

                </div>
            </div>
        </nav>
    </>
} 