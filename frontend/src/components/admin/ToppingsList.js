import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";

import Loader from "../layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import MetaData from "../layout/MetaData";
import { getAdminProducts, clearErrors, deleteProduct } from "../../action/toppings";
import Sidebar from "./Sidebar";
import { DELETE_PRODUCTS_RESET } from "../../constants/toppingsConstants";




function ToppingsList() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { loading, error, products } = useSelector(state => state.toppingsProducts);
    const { error: deleteError, isDeleted } = useSelector(state => state.toppingsProduct)


    useEffect(() => {
        dispatch(getAdminProducts());

        if (error) {
            toast.error(error);
            dispatch(clearErrors())
        }
        if (deleteError) {
            toast.error(deleteError);
            dispatch(clearErrors())
        }
        if (isDeleted) {
            toast.success("Product deleted successfully");
            navigate("/admin/toppings")
            dispatch({ type: DELETE_PRODUCTS_RESET })
        }
    }, [dispatch, error, deleteError, isDeleted])

    function setProducts() {
        const data = {
            columns: [
          
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Price',
                    field: 'price',
                    sort: 'asc'
                },

                {
                    label: 'Actions',
                    field: 'actions',

                },
            ],
            rows: []
        }

        products.forEach(product => {
            data.rows.push({
               name: product.name,
                price: `${product.price}`,
                actions: <Fragment>
                    <Link to={`/admin/drinks/${product._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button style={{border:"none"}} className=" py-1 px-2 ms-2" onClick={() => deleteProductHandler(product._id)}>
                    <i style={{color:"red"}} className="fa-sharp fa-solid fa-trash"></i>
                    </button>
                </Fragment>
            })
        })

        return data
    }

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id))
    }

    return (
        <Fragment>
            <MetaData title={"All Products"} />
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
                        <h1 className="my-5">All Products</h1>

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setProducts()}
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


export default ToppingsList