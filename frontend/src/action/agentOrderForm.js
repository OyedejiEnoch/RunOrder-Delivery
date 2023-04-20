import axios from "axios"
import {
    NEW_AGENTSORDER_REQUEST,
    NEW_AGENTSORDER_SUCCESS,
    NEW_AGENTSORDER_FAIL,
    ALL_AGENTSORDER_REQUEST,
    ALL_AGENTSORDER_SUCCESS,
    ALL_AGENTSORDER_FAIL,
    DELETE_AGENTSORDER_REQUEST,
    DELETE_AGENTSORDER_SUCCESS,
    DELETE_AGENTSORDER_FAIL,
    CLEAR_ERRORS

}from "../constants/agentOrderForm";


// we will firstly dispatch all products request which will set loading to true
export const getAgentsForm = (currentPage = 1) => async (dispatch) => {

    try {
        //this will perform the get request in the productreducers
        dispatch({ type: ALL_AGENTSORDER_REQUEST})
        //then get all data 
        const { data } = await axios.get(`/api/v1/admin/agentsForm?page=${currentPage}`)
        //then get the success and pass the data
        dispatch({
            type: ALL_AGENTSORDER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_AGENTSORDER_FAIL,
            payload: error.response.data.message
        })
    }
};

export const newAgentForm = (agentData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_AGENTSORDER_REQUEST })


        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        const { data } = await axios.post(`/api/v1/admin/agentsForm/new`, agentData, config)

        dispatch({
            type: NEW_AGENTSORDER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_AGENTSORDER_FAIL,
            payload: error.response.data.message
        })
    }
}


//Delete product Admin
export const deleteAgentForm = (id) => async (dispatch) => {
    try {

        dispatch({ type:DELETE_AGENTSORDER_REQUEST })



        const { data } = await axios.delete(`/api/v1/admin/agentsForm/${id}`)

        dispatch({
            type:DELETE_AGENTSORDER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_AGENTSORDER_FAIL,
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