import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";


import Loader from "../layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import MetaData from "../layout/MetaData";
import { useNavigate, useParams } from "react-router-dom";
import { getOrderDetails, updateOrder, clearErrors } from "../../action/orderActions";
import Sidebar from "./Sidebar";
import "./ProcessOrder.css"

import { UPDATE_0RDERS_RESET } from "../../constants/orderConstants";
import AgentOrderForm from "./AgentOrderForm";


function ProcessOrder() {

    let params = useParams()
    const [status, setStatus] = useState("");

    const { user:users } = useSelector(state => state.auth)

    const dispatch = useDispatch()
    let navigate = useNavigate()
    const { loading, order = {} } = useSelector(state => state.orderDetails)
    const { shippingInfo, orderItems, paymentInfo, user, totalPrice, orderStatus } = order
    const { error, isUpdated } = useSelector(state => state.order)

    const orderId = params.id


    useEffect(() => {

        dispatch(getOrderDetails(orderId))

        window.onload = function() {
            window.scrollTo(0, 0);
          };

        if (error) {
            toast.error(error)
            dispatch(clearErrors())
        }


        if (isUpdated) {
            toast.success("Updated Successfully")
            dispatch({ type: UPDATE_0RDERS_RESET })
        }

    }, [dispatch, error, isUpdated, orderId])



    const updateOrderHandler = (id) => {

        const formData = new FormData();
        formData.set('status', status);

        dispatch(updateOrder(id, formData))
    }



    const shippingDetails = shippingInfo && `${shippingInfo.address}, ${shippingInfo.phoneNo},${shippingInfo.cafeteria}`
    const isPaid = paymentInfo && paymentInfo.status === 'succeeded' ? true : false
    return (
        <Fragment>
            <MetaData title={`Process Order # ${order && order._id}`} />
            <div className="row">
            <div className="col-12 col-md-2">
                    <div className="sideBar">
                        <Sidebar />
                     </div>
                <div className="sideBarMenu">
                    <button className="btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling"><i className="fa-solid fa-bars"></i></button>

                 <div className="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
                    <div className="offcanvas-header">
                     <h5 className="offcanvas-title" id="offcanvasScrollingLabel">{users && users.name}</h5>
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
                        {loading ? <Loader /> : (
                            <div className="row d-flex justify-content-around processOrderPage">
                                <div className="col-12 col-lg-6 order-details">

                                    <h2 className="my-5">Order # {order._id}</h2>

                                    <h4 className="mb-4">Delivery Info</h4>
                                    <p><b>Name:</b> {user && user.name}</p>
                                    <p><b>Phone:</b> {shippingInfo && shippingInfo.phoneNo}</p>
                                    <p className="mb-4"><b>Address:</b>{shippingInfo && shippingInfo.address}</p>
                                    <p className="mb-4"><b>Cafeteria:</b>{shippingInfo && shippingInfo.cafeteria}</p>
                                    <p><b>Amount:</b><i class="fa-solid fa-naira-sign"></i>{totalPrice - 200}</p>

                                    <hr />


                                    <h4 className="my-4">Order Status:</h4>
                                    <p className={order.orderStatus && String(order.orderStatus).includes('Accepted') ? "greenColor" : "redColor"} ><b>{orderStatus}</b></p>



                                    <h4 className="my-4">Order Items:</h4>

                                    <hr />
                                    <div className="my-1">
                                        {orderItems && orderItems.map(item => (
                                            <div key={item.product} className=" cart-item ">
                                                <div className="cartAdjust">
                                                    <div className="cartAdjustProduct">
                                                        <img src={item.image} alt={item.name} height="45" width="65" />
                                                         <Link className="link" to={`/products/${item.product}`}>{item.name}</Link>
                                                    </div>
                                               

                                                    <div className="cartAdjustPrice">
                                                    <p><i class="fa-solid fa-naira-sign"></i> {item.price} * {item.quantity} Piece(s)</p>
                                                    
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <hr />
                                </div>

                                <div className="col-12 col-lg-4 mt-5 updateOrder">
                                    <h4 className="my-4">Status</h4>

                                    <div className="form-group">
                                        <select
                                            className="form-control"
                                            name='status'
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                        >
                                            <option value="Processing">Processing</option>
                                            <option value="Accepted">Accepted</option>
                                        </select>
                                    </div>

                                    <button className=" btn-block mt-10" onClick={() => updateOrderHandler(order._id)}>
                                        Update Status
                                    </button>

                                    <div className="agentForm">
                                        <AgentOrderForm />        
                                    </div>
                  </div>

                    </div>
                        )}
                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default ProcessOrder;