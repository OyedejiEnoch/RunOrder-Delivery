import React, { Fragment, useState, useEffect, } from "react";
import MetaData from "../layout/MetaData"
import Food from "../product/Food";
import { useDispatch, useSelector } from "react-redux"
import { getProducts } from "../../action/foodActions";
import Loader from "../layout/Loader";
import { toast, } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import Pagination from "react-js-pagination"
import { useParams } from "react-router-dom";

import "./Food.css"

// import Slider from "rc-slider"
// import 'rc-slider/assets/index.css';

// const { createSliderWithTooltip } = Slider
// const Range = createSliderWithTooltip(Slider.Range)

function FoodsHome() {

    const params = useParams()
    const [currentPage, setCurrentPage] = useState(1)

    const [price, setPrice] = useState([1, 1000])

    const dispatch = useDispatch()

    const { loading, products, error, productsCount, resPerPage } = useSelector(state => state.foodProducts)

    const keyword = params.keyword

    useEffect(() => {
        if (error) {
            toast.error('Error Notification !', {
                position: toast.POSITION.BOTTOM_CENTER
            });

        }

        window.onload = function() {
            window.scrollTo(0, 0);
          };
        // price
        dispatch(getProducts(keyword, currentPage));


        // price
    }, [dispatch, error, keyword, currentPage])

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber)
    }

    return (
        <Fragment>


            <div className="headerHomeToppings">

                <div className="headerCovHome">
                    <h1>Welcome to <span> Run Order </span> Products</h1>
                </div>
            </div>




            {loading ? <Loader /> : (
                <div className="container container-fluid homePageHome">

                    <MetaData title={"Order to enjoy the experience"} />
                    <h1 id="products_heading">All Products</h1>
                    <section id="products" className="container mt-5">
                        <div className="row">
                            {products && products.map(product => (
                                <Food key={product._id} product={product} />
                            ))}


                        </div>
                    </section>
                </div>
            )}

            {resPerPage <= productsCount && (
                <div className="d-flex justify-content-center mt-5" >
                    <Pagination
                        activePage={currentPage}
                        itemsCountPerPage={resPerPage}
                        totalItemsCount={productsCount}
                        onChange={setCurrentPageNo}
                        nextPageText={"Next"}
                        prevPageText={"Prev"}
                        firstPageText={"First"}
                        lastPageText={"Last"}
                        itemClass="page-item"
                        linkClass="page-link"
                    />
                </div>
            )}

        </Fragment>
    )
}



export default FoodsHome


