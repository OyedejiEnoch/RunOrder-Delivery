import React, { Fragment, useEffect } from "react";
import { Link,} from "react-router-dom";
import { MDBDataTable } from "mdbreact";

import Loader from "../layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import MetaData from "../layout/MetaData";
import { myOrders, clearErrors } from "../../action/orderActions";

function ListOrder() {

    const dispatch = useDispatch()

    const { loading, error, orders } = useSelector(state => state.myOrders)


    useEffect(() => {
        dispatch(myOrders());

        if (error) {
            toast.error(error);
            dispatch(clearErrors())
        }
    }, [dispatch, error])

    function setOrders() {
        const data = {
            columns: [
            
                {
                    label: 'Num of Items',
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
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                },
            ],
            rows: []
        }

        orders.forEach(order => {
            data.rows.push({
               
                numOfItems: order.orderItems.length,
                amount: `${order.totalPrice}`,
                status: order.orderStatus && String(order.orderStatus).includes('Accepted')
                    ? <p style={{ color: 'green' }}>{order.orderStatus}</p>
                    : <p style={{ color: 'red' }}>{order.orderStatus}</p>,
                actions:
                    <Link to={`/orders/${order._id}`} className="btn btn-primary">
                        <i className="fa fa-eye"></i>
                    </Link>
            })
        })

        return data
    }

    return (
        <Fragment>

            <MetaData title={'My Orders'} />

            <h1 className="my-5">My Orders</h1>

            {loading ? <Loader /> : (
                <MDBDataTable
                    data={setOrders()}
                    className="px-3 productsTable"
                    hover
                />
            )}

        </Fragment>
    )
}




export default ListOrder