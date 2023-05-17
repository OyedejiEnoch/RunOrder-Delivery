import axios from "axios"
import newRequest from "../utils/newRequest"
import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    PRODUCTS_DETAILS_SUCCESS,
    PRODUCTS_DETAILS_REQUEST,
    PRODUCTS_DETAILS_FAIL,
    ADMIN_PRODUCTS_REQUEST,
    ADMIN_PRODUCTS_SUCCESS,
    ADMIN_PRODUCTS_FAIL,
    NEW_PRODUCTS_REQUEST,
    NEW_PRODUCTS_SUCCESS,

    NEW_PRODUCTS_FAIL,
    DELETE_PRODUCTS_REQUEST,
    DELETE_PRODUCTS_SUCCESS,
    DELETE_PRODUCTS_FAIL,

    UPDATE_PRODUCTS_REQUEST,
    UPDATE_PRODUCTS_SUCCESS,
    UPDATE_PRODUCTS_FAIL,


    CLEAR_ERRORS
} from "../constants/toppingsConstants"
axios.defaults.withCredentials = true;


// we will firstly dispatch all products request which will set loading to true
export const getProducts = (keyword = " ", currentPage = 1) => async (dispatch) => {

    try {
        //this will perform the get request in the productreducers
        dispatch({ type: ALL_PRODUCTS_REQUEST })
        //then get all data 
        const { data } = await axios.get(`/api/v1/toppings?keyword=${keyword}&page=${currentPage}`)
        //then get the success and pass the data
        dispatch({
            type: ALL_PRODUCTS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_PRODUCTS_FAIL,
            payload: error.response.data.message
        })
    }
}



// we will firstly dispatch all products request which will set loading to true
export const getProductDetails = (id) => async (dispatch) => {
    try {
        //this will perform the get request in the productreducers
        dispatch({ type: PRODUCTS_DETAILS_REQUEST })
        //then get all data
        const { data } = await axios.get(`/api/v1/products/${id}`)
        //then get the success and pass the data
        dispatch({
            type: PRODUCTS_DETAILS_SUCCESS,
            payload: data.product
        })

    } catch (error) {
        dispatch({
            type: PRODUCTS_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}


// to get products for admin routes
export const getAdminProducts = (id) => async (dispatch) => {
    try {

        dispatch({ type: ADMIN_PRODUCTS_REQUEST })

        const { data } = await axios.get(`/api/v1/admin/toppings`)

        dispatch({
            type: ADMIN_PRODUCTS_SUCCESS,
            payload: data.products
        })

    } catch (error) {
        dispatch({
            type: ADMIN_PRODUCTS_FAIL,
            payload: error.response.data.message
        })
    }
}


export const newProduct = (productData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_PRODUCTS_REQUEST })


        const config = {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials:true
        }

        const { data } = await axios.post(`/api/v1/admin/toppings/new`, productData, config, {withCredentials:true})

        dispatch({
            type: NEW_PRODUCTS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_PRODUCTS_FAIL,
            payload: error.response.data.message
        })
    }
}

//Delete product Admin
export const deleteProduct = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_PRODUCTS_REQUEST })



        const { data } = await axios.delete(`/api/v1/admin/toppings/${id}`)

        dispatch({
            type: DELETE_PRODUCTS_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_PRODUCTS_FAIL,
            payload: error.response.data.message
        })
    }
}



//Update product admin
export const updateProduct = (id, productData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_PRODUCTS_REQUEST })


        const config = {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials:true
        }

        const { data } = await axios.put(`/api/v1/admin/toppings/${id}`, productData, config)

        dispatch({
            type: UPDATE_PRODUCTS_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCTS_FAIL,
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