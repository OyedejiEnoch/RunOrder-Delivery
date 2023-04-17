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
    DELETE_AGENTSORDER_RESET,
    CLEAR_ERRORS
} from "../constants/agentOrderForm"


export const agentsFormReducer = (state = { agents: [] }, action) => {
    switch (action.type) {
        case ALL_AGENTSORDER_REQUEST:
            return {
                loading: true,
                products: []
            }
        case ALL_AGENTSORDER_SUCCESS:
            return {
                loading: false,
                agents: action.payload.agents,
                agentsCount: action.payload.agentsCount,
                resPerPage: action.payload.resPerPage
            }


        case ALL_AGENTSORDER_FAIL:
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
};


export const newAgentFormReducer = (state = { agent: {} }, action) => {
    switch (action.type) {

        case NEW_AGENTSORDER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case NEW_AGENTSORDER_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                agent: action.payload
            }
        case NEW_AGENTSORDER_FAIL:
            return {
                ...state,
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
};




export const agentReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_AGENTSORDER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case DELETE_AGENTSORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload.success,

            }

        case DELETE_AGENTSORDER_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case DELETE_AGENTSORDER_RESET:
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