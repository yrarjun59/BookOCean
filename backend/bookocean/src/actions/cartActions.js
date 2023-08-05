import axios from "axios";
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  UPDATE_CART_ITEM_QUANTITY,
} from "../constants/cartConstants";

export const addToCart =
  (id, qty = 1) =>
  async (dispatch, getState) => {
    const { data } = await axios.get(`http://127.0.0.1:8000/api/books/${id}/`);

    dispatch({
      type: ADD_TO_CART,
      payload: {
        bookId: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        author: data.author,
        category: data.category,
        qty,
      },
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };

export const updateCartItemQuantity =
  (bookId, updatedQty) => (dispatch, getState) => {
    dispatch({
      type: UPDATE_CART_ITEM_QUANTITY,
      payload: {
        bookId,
        updatedQty,
      },
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };

export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_FROM_CART,
    payload: id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => async (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => async (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });
  localStorage.setItem("savePayment", JSON.stringify(data));
};
