import axios from "axios";

import newRequest from "../utils/newRequest";

import {
  ADD_TO_CART,
  REMOVE_ITEM_CART,
  SAVE_SHIPPING_INFO,
} from "../constants/cartConstants";

export const addItemToCart =
  (id, quantity, type) => async (dispatch, getState) => {
    try {
      let endpoint;
      if (type === "products") {
        endpoint = "/api/v1/products/";
      } else if (type === "drinks") {
        endpoint = "/api/v1/drinks/";
      } else if (type === "toppings") {
        endpoint = "/api/v1/toppings/";
      } else if (type === "foods") {
        endpoint = "/api/v1/foods/";
      } else if (type === "peacePark") {
        endpoint = "/api/v1/peacePark/";
      } else {
        throw new Error("Invalid item type");
      }

      const { data } = await newRequest.get(`${endpoint}${id}`);

      dispatch({
        type: ADD_TO_CART,
        payload: {
          product: data._id,
          name: data.name,
          price: data.price,
          image: data.images[0].url,
          stock: data.stock,
          quantity,
        },
      });

      localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cart.cartItems)
      );
    } catch (error) {
      console.log(error);
    }
  };

export const removeItemFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_ITEM_CART,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });

  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
