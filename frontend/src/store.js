import { configureStore, combineReducers, applyMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension"

import { productsReducer, productDetailsReducer, newProductReducer, productReducer } from "./reducers/productReducers"
import { drinksReducer, drinkDetailsReducer, newDrinkReducer, drinkReducer } from "./reducers/drinksReducer";
import { allToppingsReducer, toppingsDetailsReducer, newToppingsReducer, toppingsReducer } from "./reducers/toppingsReducers";

import { authReducer, userReducer, forgotPasswordReducer, allUsersReducer, userDetailsReducer } from "./reducers/userReducers";
import { cartReducer } from "./reducers/cartReducers";
import { newOrderReducer, myOrdersReducer, orderDetailsReducer, allOrderReducer, orderReducer } from "./reducers/orderReducers"
import { agentsFormReducer, newAgentFormReducer,agentReducer} from "./reducers/agentsFormReducers"
import {newCafeteriaFormReducer, cafeteriaFormReducer, cafeteriaReducer} from "./reducers/mannerReducers"
import { newNumbersCafeteriaFormReducer, numbersCafeteriaFormReducer, numbersCafeteriaReducer} from "./reducers/numbersReducers"
import {dpCafeteriaFormReducer, dpNewCafeteriaFormReducer, dpCafeteriaReducer} from "./reducers/doublePortionReducers"
import {newNkFormReducer, nkFormReducer, nkReducer} from "./reducers/nationalKitchenReducers"
import {mimiesFormReducer, mimiesReducer, newMimiesFormReducer} from "./reducers/mimiesReducers"
import {newDivineHandsFormReducer, divineHandsFormReducer, divineHandsReducer } from "./reducers/divineHandsReducers"


const rootReducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    newProduct: newProductReducer,
    product: productReducer,

    drinksProducts: drinksReducer,
    drinksProductDetails: drinkDetailsReducer,
    newDrinksProduct: newDrinkReducer,
    drinksProduct: drinkReducer,

    toppingsProducts: allToppingsReducer,
    toppingsProductDetails: toppingsDetailsReducer,
    newToppingsProduct: newToppingsReducer,
    toppingsProduct: toppingsReducer,


    auth: authReducer,
    user: userReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    
    allOrders: allOrderReducer,
    order: orderReducer,

    allAgentsOrderFrom: agentsFormReducer,
    newAgentForm: newAgentFormReducer,
    agent:agentReducer,

    newCafeteria: newCafeteriaFormReducer,
    allCafeteriaForm: cafeteriaFormReducer,
    cafeteria:cafeteriaReducer,

    numbersCafeteria: newNumbersCafeteriaFormReducer,
    allNumbersCafeteriaForm: numbersCafeteriaFormReducer,
    numbers:numbersCafeteriaReducer,


    dpCafeteria: dpNewCafeteriaFormReducer,
    allDpCafeteriaForm: dpCafeteriaFormReducer,
    doublePortion:dpCafeteriaReducer,

    nkCafeteria: newNkFormReducer,
    allNkCafeteriaForm:nkFormReducer,
    nationalKitchen:nkReducer,

    mimiesCafeteria: newMimiesFormReducer,
    allMimiesCafeteriaForm:mimiesFormReducer,
    mimies:mimiesReducer,

    divineHandsCafeteria: newDivineHandsFormReducer,
    allDivineCafeteriaForm: divineHandsFormReducer,
    divineHands: divineHandsReducer
})




let preloadedState = {
    cart: {
        cartItems: localStorage.getItem("cartItems")
            ? JSON.parse(localStorage.getItem("cartItems"))
            : [],
        shippingInfo: localStorage.getItem("shippingInfo")
            ? JSON.parse(localStorage.getItem("shippingInfo"))
            : {},
    },
};

const middleware = [thunk]
const store = configureStore({ reducer: rootReducer, preloadedState }, composeWithDevTools(applyMiddleware(...middleware)));


export default store;