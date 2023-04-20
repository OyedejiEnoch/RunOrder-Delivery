import React, { Fragment, useEffect } from "react";

import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProducts } from "../../action/productAction";
import { allOrders } from "../../action/orderActions";
import { allUsers } from "../../action/userActions";
import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';



function Dashboard() {

    const dispatch = useDispatch();

    const { products } = useSelector(state => state.products)
    const { user } = useSelector(state => state.auth)
    const { users } = useSelector(state => state.allUsers)
    const { agentsCount} = useSelector(state => state.allAgentsOrderFrom)
    const { totalAmount:amount} = useSelector(state => state.allCafeteriaForm)
    const { numberstotalAmount:NumbersAmount} = useSelector(state => state.allNumbersCafeteriaForm)
    const { dptotalAmount} = useSelector(state => state.allDpCafeteriaForm)
    const { nktotalAmount} = useSelector(state => state.allNkCafeteriaForm)
    const { mimiestotalAmount} = useSelector(state => state.allMimiesCafeteriaForm)
    const { divinetotalAmount} = useSelector(state => state.allDivineCafeteriaForm)
    const { orders, totalAmount, loading } = useSelector(state => state.allOrders)

    let outOfStock = 0;
    products.forEach(product => {
        if (product.stock === 0) {
            outOfStock += 1;
        }
    })
    useEffect(() => {
        dispatch(getAdminProducts())
        dispatch(allOrders())
        dispatch(allUsers())

    }, [dispatch])

    const value=(users.length / 10000) *100 

    return (
        <Fragment>

            <div className="row">
                <div className="col-12 col-md-2">
                    <div className="sideBar">
                        <Sidebar />
                     </div>
                <div className="sideBarMenu">
                    <button className="btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling"><i className="fa-solid fa-bars"></i></button>

                 <div className="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
                    <div className="offcanvas-header">
                     <p className="adminName"><i class="fa-solid fa-hand-wave fa-beat-fade"></i> <span>{user && user.name} </span></p>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                
                    </div>
                 <div className="offcanvas-body">
                 <Sidebar />
                 </div>
            </div>

            </div>

                </div>

    



                <div className="col-12 col-md-10 dashbord">
                    <h1 className="my-4">Dashboard</h1>
                   <h2> {user && user.name} </h2>
                    {loading ? <Loader /> : (
                        <Fragment>
                            <MetaData title={"Admin Dashbord"} />

                         

                            <div className="row pr-4">
                            { user && user.role !== "admin" && user.role !== "team" ? null :
                                (<div className="col-xl-3 col-sm-6 mb-3 dashbordBox">
                                    <div className="card o-hidden h-100 dashbordBg">
                                        <div className="card-body">
                                            <div className="text-center ">Products<br /> <i className="fa-solid fa-cart-shopping"></i>  <b>{products && products.length}</b></div>
                                        </div>
                                        <Link className="card-footer learfix small z-1" to="/admin/products">
                                            <span className="float-left">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>) }


                                <div className="col-xl-3 col-sm-6 mb-3 dashbordBox">
                                    <div className="card o-hidden h-100 dashbordBg">
                                        <div className="card-body">
                                            <div className="text-center ">Orders<br /> <i className="fa-solid fa-cart-shopping"></i> <b>{orders && orders.length}</b></div>
                                        </div>
                                        <Link className="card-footer clearfix small z-1" to="/admin/orders">
                                            <span className="float-left">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>

                                {user && user.role === "admin" &&
                                (<div className="col-xl-3 col-sm-6 mb-3 dashbordBox">
                                    <div className="card o-hidden h-100 dashbordBg">
                                        <div className="card-body">
                                            <div className="text-center ">Users<br /> <i className="fa-solid fa-users"></i> <b>{users && users.length}</b></div>
                                        </div>
                                        <Link className="card-footer learfix small z-1" to="/admin/users">
                                            <span className="float-left">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>) }

                                 {user && user.role === "admin" &&
                                (<div className="col-xl-3 col-sm-6 mb-3 dashbordBox">
                                    <div className="card o-hidden h-100 dashbordBg">
                                        <div className="card-body">
                                            <div className="text-center ">Out of Stock<br /> <b>{outOfStock}</b></div>
                                        </div>
                                    </div>
                                </div>)}

                            </div>

                            {user && user.role === "admin" &&
                            (<div className="row pr-4">
                                <div className="col-xl-12 col-sm-12 mb-3 ">
                                    <div className="card o-hidden h-100 dashbordBg">
                                        <div className="card-body">
                                            <div className="text-center ">Total Amount<br /> <b>N {totalAmount && totalAmount.toFixed(2)}</b>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>)  }



                        <div className="row pr-4">
                        { user && user.role !== "admin" && user.role !=="team" ? null :
                            (<div className="col-xl-3 col-sm-6 mb-3 dashbordBox">
                                    <div className="card o-hidden h-100 dashbordBg">
                                        <div className="card-body">
                                            <div className="text-center ">AgentsOrders<br /> <i className="fa-solid fa-cart-shopping"></i> <b>{agentsCount && agentsCount}</b></div>
                                        </div>
                                        <Link className="card-footer clearfix small z-1" to="/admin/agentsForm">
                                            <span className="float-left">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>) }

                            { user && user.role !=="admin" && user.role !=="team" && user.role !=="MannerPalace" ? null :

                            (<div className="col-xl-3 col-sm-6 mb-3 dashbordBox">
                                    <div className="card o-hidden h-100 dashbordBg">
                                        <div className="card-body">
                                            <div className="text-center ">MannerPalace<br /> <i className="fa-solid fa-naira-sign"></i> <b>{ amount}</b></div>
                                        </div>
                                        <Link className="card-footer clearfix small z-1" to="/admin/mannerPalaceForm">
                                            <span className="float-left">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>) }

                            { user && user.role !== "admin" && user.role !=="team" && user.role !=="Numbers" ? null :
                         (<div className="col-xl-3 col-sm-6 mb-3 dashbordBox">
                                    <div className="card o-hidden h-100 dashbordBg">
                                        <div className="card-body">
                                            <div className="text-center ">Numbers<br /> <i className="fa-solid fa-naira-sign"></i> <b>{NumbersAmount}</b></div>
                                        </div>
                                        <Link className="card-footer clearfix small z-1" to="/admin/numbersForm">
                                            <span className="float-left">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>) }

                            {user && user.role !=="admin" && user.role !=="team" && user.role !=="DoublePortion" ? null :
                           (<div className="col-xl-3 col-sm-6 mb-3 dashbordBox">
                                    <div className="card o-hidden h-100 dashbordBg">
                                        <div className="card-body">
                                            <div className="text-center ">DoublePortion<br /> <i className="fa-solid fa-naira-sign"></i> <b>{dptotalAmount}</b></div>
                                        </div>
                                        <Link className="card-footer clearfix small z-1" to="/admin/doublePortion">
                                            <span className="float-left">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>)}

                            { user && user.role !=="admin" && user.role !=="team" && user.role !=="NationalKitchen" ? null :
                            (<div className="col-xl-3 col-sm-6 mb-3 dashbordBox">
                                    <div className="card o-hidden h-100 dashbordBg">
                                        <div className="card-body">
                                            <div className="text-center ">National Kitchen<br /> <i className="fa-solid fa-naira-sign"></i> <b>{nktotalAmount}</b></div>
                                        </div>
                                        <Link className="card-footer clearfix small z-1" to="/admin/nationalKitchen">
                                            <span className="float-left">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>)}

                            { user && user.role !=="admin" && user.role !=="team" && user.role !=="Mimies" ? null :
                        (<div className="col-xl-3 col-sm-6 mb-3 dashbordBox">
                                    <div className="card o-hidden h-100 dashbordBg">
                                        <div className="card-body">
                                            <div className="text-center ">Mimies<br /> <i className="fa-solid fa-naira-sign"></i> <b>{mimiestotalAmount}</b></div>
                                        </div>
                                        <Link className="card-footer clearfix small z-1" to="/admin/mimies">
                                            <span className="float-left">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>)}

                            {user && user.role !=="admin" && user.role !=="team" && user.role !=="DivineHands" ? null :
                          (<div className="col-xl-3 col-sm-6 mb-3 dashbordBox">
                                    <div className="card o-hidden h-100 dashbordBg">
                                        <div className="card-body">
                                            <div className="text-center ">Divine Hands<br /> <i className="fa-solid fa-naira-sign"></i> <b>{divinetotalAmount}</b></div>
                                        </div>
                                        <Link className="card-footer clearfix small z-1" to="/admin/divineHands">
                                            <span className="float-left">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>)}

                                
                            </div>




                            {user && user.role !=="admin" && user.role !=="team"  ? null :
                        (<div className="barChart">
                        
                        <CircularProgressbar value={value} maxValue={100} text={`${value}%`}  styles={buildStyles({
                            textSize: '14px',
                            strokeWidth:"7",
                        })}/>;
                        <p>Percentage of users registered</p>
                        </div>)}


                        </Fragment>
                    )}

                </div>

            </div>

        </Fragment>
    )
}


export default Dashboard;