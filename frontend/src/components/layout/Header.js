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
                                        <img onClick={() => setOpen(!open)} src= "./images/undraw_pic_profile_re_7g2h.svg" alt="img"/>
                                        <p className="userName" onClick={() => setOpen(!open)}>{user && user.name}</p>
                                        <span onClick={() => setOpen(!open)}><i className="fa-solid fa-angle-down"></i></span>
                                        <span onClick={() => setOpen(!open)}><i className="fa-solid fa-bars"></i></span>
                                    </div>

                                ) : !loading && <Link to="/login" id="login_btn" className="link"><span className="headerLogin">Login/Register</span></Link>}

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



