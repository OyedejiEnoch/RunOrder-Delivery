import React, { Fragment, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./OrderDetails.css"


import Loader from "../layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import MetaData from "../layout/MetaData";
import { getOrderDetails, clearErrors } from "../../action/orderActions";

function OrderDetails() {

    const dispatch = useDispatch()
    let params = useParams()

    const { loading, error, order = {} } = useSelector(state => state.orderDetails)
    const { shippingInfo, orderItems, paymentInfo, user, totalPrice, orderStatus } = order

    useEffect(() => {
        dispatch(getOrderDetails(params.id));

        if (error) {
            toast.error(error);
            dispatch(clearErrors())
        }
    }, [dispatch, error, params.id])


    const deliveryDetails = shippingInfo && `${shippingInfo.address} `
    const locationDetails = shippingInfo && `${shippingInfo.cafeteria}`

    const isPaid = paymentInfo && paymentInfo.status === 'succeeded' ? true : false
    return (
        <Fragment>
            <MetaData title={"Order Details"} />

            {loading ? <Loader /> : (
                <Fragment>
                    <div className="row d-flex justify-content-between">
                        <div className="col-12 col-lg-8 mt-5 order-details">

                            <h1 className="my-5">Order #{order._id}</h1>

                            <h4 className="mb-4">Delivery Info</h4>
                            <p><b>Name:</b>{user && user.name}</p>
                            <p><b>Phone:</b> {shippingInfo && shippingInfo.phoneNo}</p>
                            <p className="mb-4"><b>Address:</b> {deliveryDetails}</p>
                            <p className="mb-4"><b>Cafeteria:</b> {locationDetails}</p>
                            <p><b>Amount:</b> N{totalPrice}</p>

                            <hr />

        
                            <h4 className="my-4">Order Status:</h4>
                            <p className={order.orderStatus && String(order.orderStatus).includes('Delivered')} ><b>{orderStatus}</b></p>


                            <h4 className="my-4">Order Items:</h4>

                            <hr />
                            <div className="cart-item1 ">
                                {orderItems && orderItems.map(item => (
                                    <div className="cart-item1" key={item.product}>
                                    <div className="cartAdjust">
                                        <div className="cartAdjustProduct">
                                            <img src={item.image} alt={item.name} height="45" width="65" /> <Link className="link" to={`/products/${item.product}`}>{item.name}</Link>
                                        </div>

                                        {/* <div className="cartAdjustPrice">
                                            <Link to={`/products/${item.product}`}>{item.name}</Link>
                                        </div> */}


                                        <div className="cartAdjustPrice1">
                                            <p> <i class="fa-solid fa-naira-sign"></i>{item.price} * {item.quantity}</p>
                                        </div>

                                        {/* <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                            <p>{item.quantity}</p>
                                        </div> */}
                                    </div>
                                    </div>
                                ))}

                            </div>
                            <hr />
                        </div>
                    </div>

                </Fragment>
            )}

        </Fragment>
    )

}


export default OrderDetails;