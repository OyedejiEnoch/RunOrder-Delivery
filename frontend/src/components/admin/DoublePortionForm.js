import React, { Fragment, useState, useEffect, } from "react";
import Sidebar from "./Sidebar";

import MetaData from "../layout/MetaData";
import {getCafeteriaForm} from "../../action/doublePortionActions"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../layout/Loader";
import { toast, } from "react-toastify"
import Pagination from "react-js-pagination"
import { useParams } from "react-router-dom";
import DoublePortionDisplay from "../formsDisplay/DoublePortionDisplay";
import DoublePortionFill from "../forms/DoublePortionFill";
import NumbersFormFill from "../forms/NumbersFormFill"
import NumbersDisplay from "../formsDisplay/NumbersDisplayForm"

const DoublePortionForm = () => {
    const params = useParams()
    const [currentPage, setCurrentPage] = useState(1)


    const dispatch = useDispatch()

    const { loading, cafeteriaForms, error, formsCount, dptotalAmount ,resPerPage } = useSelector(state => state.allDpCafeteriaForm)

    // const keyword = params.keyword

    useEffect(() => {
        if (error) {
            toast.error('Error Notification !', {
                position: toast.POSITION.BOTTOM_CENTER
            });

        }
        // price
        dispatch(getCafeteriaForm( currentPage));


        // price
    }, [dispatch, error, currentPage]);


    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber)
    }



  return (
    <Fragment>

        <MetaData title={"Orders taken by agents"} />    
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
                <div className="agentsCount">
                <h2>Double Portion</h2>
                <h1>Total Orders taken: <span>{formsCount} </span> </h1>
                <h1>Total Amount:<span><i className="fa-solid fa-naira-sign"></i>{dptotalAmount}</span> </h1>

               <DoublePortionFill />
                </div>

                {loading ? <Loader /> : (
                <div className="agentsForm ">
                
                {cafeteriaForms && cafeteriaForms.map(form => (
                
                    <DoublePortionDisplay key={form._id} forms={form} />
                    ))}
                </div>)}
            </div>
                

            {resPerPage <= formsCount && (
                <div className="d-flex justify-content-center mt-5" >
                    <Pagination
                        activePage={currentPage}
                        itemsCountPerPage={resPerPage}
                        totalItemsCount={formsCount}
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
                

        </div>
    </Fragment>
  )
}

export default DoublePortionForm
