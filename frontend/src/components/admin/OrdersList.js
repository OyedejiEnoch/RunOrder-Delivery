import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";

import Loader from "../layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import MetaData from "../layout/MetaData";
import { allOrders, clearErrors, deleteOrder } from "../../action/orderActions";
import Sidebar from "./Sidebar";
import { DELETE_0RDERS_RESET, } from "../../constants/orderConstants";



function OrderList() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { loading, error, orders } = useSelector(state => state.allOrders);
    const { isDeleted } = useSelector(state => state.order)



    useEffect(() => {
        dispatch(allOrders());

        if (error) {
            toast.error(error);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            toast.success("Order deleted successfully");
            navigate("/admin/orders")
            dispatch({ type: DELETE_0RDERS_RESET, })
        }
    }, [dispatch, error, isDeleted])

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id))
    }

    function setOrders() {
        const data = {
            columns: [
             
                {
                    label: 'No of Items',
                    field: 'numOfItems',
                    sort: 'asc'
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: 'Status',
                    field: 'Status',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',

                },
            ],
            rows: []
        }

        orders.forEach(order => {
            data.rows.push({
               
                numOfItems: order.shippingInfo.address,
                amount: `N ${order.totalPrice - 200}`,
                Status: order.orderStatus && String(order.orderStatus).includes('Accepted')
                ? <p style={{ color: 'green' }}>{order.orderStatus}</p>
                : <p style={{ color: 'red' }}>{order.orderStatus}</p>,
                actions:
                <Fragment>
                <Link to={`/admin/order/${order._id}`} className=" py-1 px-2">
                    <i className="fa fa-eye"></i>
                </Link>
                <button style={{border:"none"}} className="delete py-1 px-2 ml-2" onClick={() => deleteOrderHandler(order._id)} >
                <i style={{color:"red" }} className="fa-sharp fa-solid fa-trash"></i>
                </button>
            </Fragment>
            })
        })

       
        
        return data
    }


    


    // orders.forEach(order => {
    //     data.rows.push({
    //         numofItems: order.orderItems.length,
    //         amount: `N ${order.totalPrice - 200}`,
    //         status: order.shippingPrice,
    //         actions:
    //     })
    // })

    return (
        <Fragment>
            <MetaData title={"All Orders"} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <div className="sideBar">
                        <Sidebar />
                     </div>
                <div className="sideBarMenu">
                    <button className="btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling"><i className="fa-solid fa-bars"></i></button>

                 <div className="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
                    <div className="offcanvas-header">
                     <h5 className="offcanvas-title" id="offcanvasScrollingLabel">Offcanvas with body scrolling</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                
                    </div>
                 <div className="offcanvas-body">
                 <Sidebar />
                 </div>
            </div>

            </div>

                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">All Orders</h1>

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setOrders()}
                                className="px-3 productsTable"
                                hover
                            />
                        )}

                    </Fragment>
                </div>

            </div>
        </Fragment>
    )
}


export default OrderList;