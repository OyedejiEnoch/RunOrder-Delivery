import axios from "axios"
import newRequest from "../utils/newRequest"
import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    MY_0RDERS_REQUEST,
    MY_0RDERS_SUCCESS,
    MY_0RDERS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ALL_0RDERS_REQUEST,
    ALL_0RDERS_SUCCESS,
    ALL_0RDERS_FAIL,
    UPDATE_0RDERS_REQUEST,
    UPDATE_0RDERS_SUCCESS,
    UPDATE_0RDERS_FAIL,
    DELETE_0RDERS_REQUEST,
    DELETE_0RDERS_SUCCESS,
    DELETE_0RDERS_FAIL,
    CLEAR_ERRORS
} from "../constants/orderConstants"
axios.defaults.withCredentials = true;


export const createOrder = (order) => async (dispatch, getState) => {
    try {

        dispatch({ type: CREATE_ORDER_REQUEST })

        const config = {
            headers: {
                "content-Type": "application/json"
            },
            withCredentials:true
        }

        const { data } = await newRequest.post("/api/v1/order/new", order, config, {withCredentials:true})
        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response.data.message
        })
    }
}

// Get currently logged in ussers orders
export const myOrders = () => async (dispatch) => {
    try {

        dispatch({ type: MY_0RDERS_REQUEST });

        const { data } = await newRequest.get('/api/v1/orders/me')

        dispatch({
            type: MY_0RDERS_SUCCESS,
            payload: data.orders
        })

    } catch (error) {
        dispatch({
            type: MY_0RDERS_FAIL,
            payload: error.response.data.message
        })
    }
}



// Get order details
export const getOrderDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: ORDER_DETAILS_REQUEST });

        const { data } = await newRequest.get(`/api/v1/order/${id}`)

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data.order
        })

    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}


// Get all orders Admin
export const allOrders = () => async (dispatch) => {
    try {

        dispatch({ type: ALL_0RDERS_REQUEST });

        const { data } = await newRequest.get(`/api/v1/admin/orders`)

        dispatch({
            type: ALL_0RDERS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_0RDERS_FAIL,
            payload: error.response.data.message
        })
    }
}
// Get all orders Admin => orders status still in Processing
export const allProcessingOrders = () => async (dispatch) => {
    try {

        dispatch({ type: ALL_0RDERS_REQUEST });

        const { data } = await newRequest.get(`/api/v1/admin/orders?orderStatus=Processing`)

        dispatch({
            type: ALL_0RDERS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_0RDERS_FAIL,
            payload: error.response.data.message
        })
    }
}


// Update Order
export const updateOrder = (id, orderData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_0RDERS_REQUEST })

        const config = {
            headers: {
                "content-Type": "application/json"
            },
            withCredentials:true
        }

        const { data } = await newRequest.put(`/api/v1/admin/orders/${id}`, orderData, config)
        dispatch({
            type: UPDATE_0RDERS_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_0RDERS_FAIL,
            payload: error.response.data.message
        })
    }
}

// Delete Order
export const deleteOrder = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_0RDERS_REQUEST })


        const { data } = await newRequest.delete(`/api/v1/admin/orders/${id}`)

        dispatch({
            type: DELETE_0RDERS_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_0RDERS_FAIL,
            payload: error.response.data.message
        })
    }
}



//to clear errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    })
}

