import React from "react";
import { Link } from "react-router-dom"
import 'animate.css';
import "./Product.css"


function Product({ product }) {
    return (
        <div key={product._id} className="col-sm-12 col-md-6 col-lg-3 my-3 body animate__animated animate__fadeInUp">

            <div className="productCard">
                <Link className="link" to={`/product/${product._id}`}> <img

                    src={product.images[0].url}
                /></Link>
                <div className="productInfo">
                    <h3><Link className="link" to={`/product/${product._id}`}>{product.name}</Link></h3>
                    <div className="productPrice">

                        <i className="fa-solid productCart fa-cart-shopping shoppingIcon"></i>
                        <p><i className="fa-solid fa-naira-sign"></i> {product.price}</p>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Product;



{/* <div className="card p-3 rounded">
<img
    className="card-img-top mx-auto"
    src={product.images[0].url}
/>
<div className="card-body d-flex flex-column">
    <h5 className="card-title">
        <Link to={`/product/${product._id}`}>{product.name}</Link>
    </h5>

    <p className="card-text">N {product.price}</p>
    <Link to={`/product/${product._id}`} id="view_btn" className="btn btn-block">View Details</Link>
</div>
</div> */}