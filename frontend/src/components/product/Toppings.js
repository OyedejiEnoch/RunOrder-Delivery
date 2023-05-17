import React from "react";
import { Link } from "react-router-dom"
import 'animate.css';
import "./Product.css"


function Toppings({ product }) {
    return (
        <div key={product._id} className="col-sm-12 col-md-6 col-lg-3 my-3 body animate__animated animate__fadeInUp">

            <div className="productCard">
                <Link className="link" to={`/toppings/${product._id}`}> <img

                    src={product.images[0].url}
                /></Link>
                <div className="productInfo">
                    <h3><Link className="link" to={`/toppings/${product._id}`}>{product.name}</Link></h3>
                    <div className="productPrice">

                        <i className="fa-solid productCart fa-cart-shopping shoppingIcon"></i>
                        <p><i className="fa-solid fa-naira-sign"></i> {product.price}</p>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Toppings;



