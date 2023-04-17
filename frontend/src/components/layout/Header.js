import React, { Fragment, useState, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import Search from "./Search";
import { logout } from "../../action/userActions";
import { toast } from "react-toastify";
import "./Header.css";

function Header() {
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false)
    const [active, setActive] = useState(false)

    const { user, loading } = useSelector(state => state.auth)
    const { cartItems } = useSelector(state => state.cart)

    function handleLogout() {
        dispatch(logout());
        toast.success("Logged out successfully")
    }

    const isActive = () => {
        window.scrollY > 0 ? setActive(true) : setActive(false)
    }

    useEffect(() => {
        window.addEventListener("scroll", isActive);

        return () => {
            window.removeEventListener("scroll", isActive)
        }
    }, [])
    return (
        <Fragment>
            <div className={active ? "headerNav active" : "headerNav"} >
                <div className="navbarContainer" >
                    <div className="navbarLogo">
                        <Link to={"/"} style={{ color: "black" }} className="link"><h1>RunOrder</h1> </Link>
                    </div>
                    <div className="navbarMenu">
                        <Link style={{ color: "black" }} to="/cart" className="link">
                            <div className="navbarCart">

                                <p>Cart</p>
                                <p ><i className="fa-solid fa-cart-shopping"></i></p>
                                <span>{cartItems?.length}</span>


                            </div>
                        </Link>


                        <div className="navbarUser" >
                            {user ?

                                (
                                    <div className="navbarUserProfile">
                                        <img onClick={() => setOpen(!open)} src={ "./images/undraw_pic_profile_re_7g2h.svg"} alt={user && user.name} />
                                        <p className="userName" onClick={() => setOpen(!open)}>{user && user.name}</p>
                                        <span onClick={() => setOpen(!open)}><i className="fa-solid fa-angle-down"></i></span>
                                        <span onClick={() => setOpen(!open)}><i className="fa-solid fa-bars"></i></span>
                                    </div>

                                ) : !loading && <Link to="/login" id="login_btn" className="link">Login/ Register</Link>}

                            {open &&
                                (<div className="options">
                                    {user && user.role !== "admin" && user.role !== "agents" && user.role !== "team"  && user.role !== "MannerPalace"  && user.role !== "NationalKitchen" 
                                    && user.role !== "Mimies"  && user.role !== "DoublePortion"  && user.role !== "Numbers"  && user.role !== "DivineHands"?
                                        (<Link className="link" style={{ color: "black" }} to="/orders/me">Orders</Link>) :
                                        (<Link style={{ color: "black" }} className="link" to="/dashbord">Dashbord</Link>)
                                    }
                                    <Link className="link" style={{ color: "black" }} to="/">Home</Link>
                                    <Link style={{ color: "black" }} className="dropdown-item" to="/me">Profile</Link>
                                    <Link style={{ color: "black" }} className="dropdown-item" to="/" onClick={handleLogout}>Logout</Link>

                                </div>)}


                        </div>


                    </div>
                </div>
            </div>

        </Fragment>
    )


}

export default Header










// <nav className="navbar row">
// <div className="col-12 col-md-3">
//     <Link className="navbar-brand" to={"/"}>Run Order</Link>
// </div>

// {/* <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//     <span class="navbar-toggler-icon"></span>
// </button> */}
// <div className="col-12 col-md-6 mt-2 mt-md-0">

//     <Search />

// </div>


// {/* text center */}
// <div className="col-12 col-md-3 mt-4 mt-md-0 ">
//     <Link to="/cart" style={{ textDecoration: "none" }} >
//         <span id="cart" className="ms-3">Cart</span>
//         <span className="ms-1" id="cart_count">{cartItems?.length}</span>
//     </Link>

//     {user ? (
//         <div className="ms-4 dropdown  nav-item dropdown">
//             <Link to="#!" className="btn dropdown-toggle text-white nav-link dropdown-toggle me-3" type="button" id="dropDownMenuButton"
//                 data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-bs-toggle="dropdown">
//                 <figure className="avatar avatar-nav" >
//                     <img src={user.avatar && user.avatar.url} alt={user && user.name}
//                         className="rounded-circle"
//                     />
//                 </figure>
//                 <span>{user && user.name}</span>
//             </Link>

//             <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">
//                 {user && user.role !== "admin" && user.role !== "agents" && user.role !== "team" ? (
//                     <Link className="dropdown-item" to="/orders/me">Orders</Link>
//                 ) : (
//                     <Link className="dropdown-item" to="/dashbord">Dashbord</Link>
//                 )}
//                 <Link className="dropdown-item" to="/me">Profile</Link>
//                 <Link className="dropdown-item text-danger" to="/" onClick={handleLogout}>
//                     Logout
//                 </Link>
//             </div>
//         </div>
//     ) : !loading && <Link to={"/login"} className="btn ms-4" id="login_btn">Login</Link>}


// </div>


// </nav>