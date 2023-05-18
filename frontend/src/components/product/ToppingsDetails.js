import React, { Fragment, useEffect, useState } from "react";
import { getToppingsDetails, clearErrors } from "../../action/toppings";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import { useParams } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import { addItemToCart } from "../../action/cartActions";

import "./ProductDetails.css"

function ToppingsDetails() {

    const [quantity, setQuantity] = useState(1)

    const params = useParams();
    const dispatch = useDispatch();

    const { loading, error, product } = useSelector(state => state.toppingsProductDetails)

    useEffect(() => {
        dispatch(getToppingsDetails(params.id))



        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

    }, [dispatch, error, params.id])


    function addToCart() {
        dispatch(addItemToCart(params.id, quantity, 'toppings'));
        toast.success("Item Added to Cart");
    }

    function increaseQty() {
        const count = document.querySelector(".count")

        if (count.valueAsNumber >= product.stock) return;

        const qty = count.valueAsNumber + 1
        setQuantity(qty)
    }

    function decreaseQty() {
        const count = document.querySelector(".count")

        if (count.valueAsNumber <= 1) return;
        //if count is <1 then stop
        //else
        const qty = count.valueAsNumber - 1
        setQuantity(qty)


    }

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={product.name} />
                    <div className="row f-flex justify-content-around ">
                        <div className="col-12 col-lg-5 img-fluid" id="product_image">
                            <Carousel pause="hover">
                                {product.images && product.images.map(image => (
                                    <Carousel.Item key={image.public_id}>
                                        <img className="d-block w-100" src={image.url} alt={product.title} />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </div>

                        <div className="col-12 col-lg-5 mt-5 productDetails ">

                            <div className="productDesc">
                                <p>Run order products</p>
                                <h2>{product.name}</h2>


                                <p>{product.description}</p>

                                <div className="productAvalablity">
                                    <h2>N {product.price}</h2>
                                    <p>Status:  <span id="stock_status" className={product.stock > 0 ? "greenColor" : "redColor"}>{product.stock > 0 ? "In Stock" : "Out of Stock"}</span></p>
                                </div>
                                
                                <h3><i className="fa-solid fa-exclamation fa-shake"></i></h3>
                                <p> <span className="available">Currently Available only at   : {product.seller} </span></p>

                            </div>

                            <div className="productInput col-lg-6">
                                <span onClick={decreaseQty}>-</span>
                                <input type="number" className="form-control count d-inline" value={quantity} readOnly />

                                <span onClick={increaseQty}>+</span>

                            </div>
                            <div className="productButton col-lg-6">
                                <button
                                    disabled={product.stock === 0} onClick={addToCart}
                                ><span ><i class="fa-solid fa-cart-shopping"></i></span>   Add to cart</button>
                            </div>

                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}




export default ToppingsDetails

