import React, {useEffect, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import MetaData from "../layout/MetaData";
import { addItemToCart, removeItemFromCart } from "../../action/cartActions";
import "./Cart.css"

function Cart() {                

    const dispatch = useDispatch();
    let navigate = useNavigate()

    const { cartItems } = useSelector(state => state.cart)

    const removeCartItemHandler = (id) => {
        dispatch(removeItemFromCart(id))
    }


    useEffect(()=>{
        window.onload = function() {
            window.scrollTo(0, 0);
          };
    }, [])

    function increaseQty(id, quantity, stock) {
        const newQty = quantity + 1
        {console.log(quantity)}
        if (newQty > stock) return;

        dispatch(addItemToCart(id, newQty))
    }

    function decreaseQty(id, quantity) {
        const newQty = quantity - 1

        if (newQty <= 0) return;

        dispatch(addItemToCart(id, newQty))

    }

    function checkoutHandler() {
        navigate("/shipping")
    }

    return (
        <Fragment>
            <MetaData title={"Your shopping cart"} />
            {cartItems.length === 0 ? <h2 className="mt-5">Your Cart is Empty</h2> : (
                <Fragment>

                    <h2 className="mt-5">Your Cart: <b>{cartItems.length} items</b></h2>
                   
                    <div className="row d-flex justify-content-between">
                        <div className="col-12 col-lg-8">
                            {cartItems.map(item => (
                                <Fragment>
                                    <hr />


                                    <div className="cart-item" key={item.name}>
                                        <div className="cartAdjust" key={item.name}>
                                            <div className="cartAdjustProduct">
                                                <img src={item.image} alt="image" />
                                                <Link className="link" to={`/product/${item.product}`}> <span>{item.name}</span></Link>
                                            </div>


                                            <div className="cartAdjustPrice">
                                            <i className="fa-solid fa-naira-sign"></i>
                                             <span className="price" >{item.price}</span>
                                            </div>


                                            <div className="stockCounter cartAdjustQuantity">
                                                <button style={{width:"fit-content", height:" fit-content", borderRadius:"10px"}} className="cartAdjustQuantityBtn" onClick={() => decreaseQty(item.product, item.quantity)}>-</button>
                                                <input type="number" className="form-control count d-inline" value={item.quantity} readOnly />

                                                <button style={{width:"fit-content", height:" fit-content", borderRadius:"10px"}} className="cartAdjustQuantityBtn" onClick={() => increaseQty(item.product, item.quantity, item.stock)}>+</button>
                                            </div>


                                            <div className="cartAdjustDelete">
                                                <i onClick={() => removeCartItemHandler(item.product)} className="fa-sharp fa-solid fa-trash"></i>
                                            </div>

                                        </div>
                                    </div>

                                </Fragment>
                            ))}

                            <hr />
                        </div>

                        <div className="col-12 col-lg-3 my-4 orderSummary">
                            <div id="order_summary">
                                <h4>Order Summary</h4>
                                <hr />
                                <p>Subtotal:  <span className="order-summary-values">{cartItems.reduce((acc, item) => (acc + Number(item.quantity)), 0)} (Units)</span></p>
                                <p>Est. total: <span className="order-summary-values"><i className="fa-solid fa-naira-sign"></i> {cartItems.reduce((acc, item) => (acc + item.quantity * item.price), 0).toFixed(2)}</span></p>

                                <hr />
                                <button onClick={checkoutHandler}>Check out</button>
                            </div>
                        </div>
                    </div>


                </Fragment>
            )}
        </Fragment>
    )
}

export default Cart;