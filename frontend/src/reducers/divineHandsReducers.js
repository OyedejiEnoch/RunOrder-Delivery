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
    DELETE_FORM_RESET,
    CLEAR_ERRORS
   } from "../constants/divineHandsConstants"
   
   
   
   export const divineHandsFormReducer = (state = { cafeteriaForms: [] }, action) => {
       switch (action.type) {
           case ALL_FROM_REQUEST:
               return {
                   loading: true,
                   products: []
               }
           case ALL_FROM_SUCCESS:
               return {
                   loading: false,
                   cafeteriaForms: action.payload.cafeteriaForms,
                   formsCount: action.payload.formsCount,
                   resPerPage: action.payload.resPerPage,
                   divinetotalAmount: action.payload.divinetotalAmount
               }
   
   
           case ALL_FROM_FAIL:
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
   
   
   export const newDivineHandsFormReducer = (state = { divineHands: {} }, action) => {
       switch (action.type) {
   
           case NEW_FORM_REQUEST:
               return {
                   ...state,
                   loading: true
               }
           case NEW_FORM_SUCCESS:
               return {
                   loading: false,
                   success: action.payload.success,
                   divineHands: action.payload
               }
           case NEW_FORM_FAIL:
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
   
   
   
   
   export const divineHandsReducer = (state = {}, action) => {
       switch (action.type) {
   
           case DELETE_FORM_REQUEST:
               return {
                   ...state,
                   loading: true
               }
           case DELETE_FORM_SUCCESS:
               return {
                   ...state,
                   loading: false,
                   isDeleted: action.payload.success,
   
               }
   
           case DELETE_FORM_FAIL:
               return {
                   ...state,
                   error: action.payload
               }
   
           case DELETE_FORM_RESET:
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