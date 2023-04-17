
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
    UPDATE_0RDERS_RESET,
    UPDATE_0RDERS_FAIL,
    DELETE_0RDERS_REQUEST,
    DELETE_0RDERS_SUCCESS,
    DELETE_0RDERS_RESET,
    DELETE_0RDERS_FAIL,
    CLEAR_ERRORS
} from "../constants/orderConstants"


export const newOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            }

        case CREATE_ORDER_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }

        case CREATE_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const myOrdersReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case MY_0RDERS_REQUEST:
            return {
                loading: true,

            }

        case MY_0RDERS_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            }


        case MY_0RDERS_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}


export const orderDetailsReducer = (state = { orders: {} }, action) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return {
                loading: true,

            }

        case ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }


        case ORDER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}


export const allOrderReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case ALL_0RDERS_REQUEST:
            return {
                loading: true,

            }

        case ALL_0RDERS_SUCCESS:
            return {
                loading: false,
                orders: action.payload.orders,
                totalAmount: action.payload.totalAmount
            }


        case ALL_0RDERS_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const orderReducer = (state = {}, action) => {
    switch (action.type) {


        case UPDATE_0RDERS_REQUEST:
        case DELETE_0RDERS_REQUEST:
            return {
                ...state,
                loading: true
            }



        case UPDATE_0RDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,

            }

        case DELETE_0RDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,

            }


        case UPDATE_0RDERS_FAIL:
        case DELETE_0RDERS_FAIL:
            return {
                ...state,
                error: action.payload
            }


        case UPDATE_0RDERS_RESET:
            return {
                ...state,
                isUpdated: false
            }

        case DELETE_0RDERS_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }


        default:
            return state;
    }
}