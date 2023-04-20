import axios from "axios"
import {

    NEW_FORM_REQUEST, 
    NEW_FORM_SUCCESS,
    NEW_FORM_FAIL,
    ALL_FROM_REQUEST,
    ALL_FROM_SUCCESS,
    ALL_FROM_FAIL,
    DELETE_FORM_REQUEST,
    DELETE_FORM_SUCCESS,
    DELETE_FORM_FAIL,
    CLEAR_ERRORS
   
   } from "../constants/numbersConstants"


// we will firstly dispatch all products request which will set loading to true
export const getCafeteriaForm = (currentPage = 1) => async (dispatch) => {

    try {
        //this will perform the get request in the productreducers
        dispatch({ type: ALL_FROM_REQUEST})
        //then get all data 
        const { data } = await axios.get(`/api/v1/admin/numbers?page=${currentPage}`)
        //then get the success and pass the data
        dispatch({
            type: ALL_FROM_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type:ALL_FROM_FAIL,
            payload: error.response.data.message
        })
    }
};

export const newCafeteriaForm = (agentData) => async (dispatch) => {
    try {

        dispatch({ type:NEW_FORM_REQUEST })


        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        const { data } = await axios.post(`/api/v1/admin/numbers/new`, agentData, config)

        dispatch({
            type: NEW_FORM_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_FORM_FAIL,
            payload: error.response.data.message
        })
    }
}


//Delete product Admin
export const deleteCafeteriaForm = (id) => async (dispatch) => {
    try {

        dispatch({ type:DELETE_FORM_REQUEST })



        const { data } = await axios.delete(`/api/v1/admin/numbers/${id}`)

        dispatch({
            type:DELETE_FORM_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_FORM_FAIL,
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