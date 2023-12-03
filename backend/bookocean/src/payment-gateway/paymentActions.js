import axios from "axios";
import khaltiConfig from "./khaltiConfig";

export const PAYMENT_REQUEST = 'PAYMENT_REQUEST';
export const PAYMENT_LOADING = 'PAYMENT_LOADING';
export const PAYMENT_SUCCESS = 'PAYMENT_SUCCESS';
export const PAYMENT_ERROR = 'PAYMENT_ERROR';


// key & url
// const mykey = khaltiConfig.key
// const url = khaltiConfig.url;


// ACTIONS
export const payment = (userDetails, productDetails) => async (dispatch) => {
  const mykey = 'be2939d9222c44d5b6175d0cfbe4ac97';
  const url = "https://a.khalti.com/api/v2/epayment/initiate/";

  try {
    const payload = {
      return_url: `http://localhost:5173/#/order/${userDetails.orderId}`,
      website_url: "http://localhost:5173/",
      amount: productDetails.totalAmount * 100,
      purchase_order_id: productDetails.orderId,
      // purchase_order_name: productDetails.productName,
      purchase_order_name:"product 1",
      customer_info: {
        "name": userDetails.name,
        "email": userDetails.email,
        "phone":'9840320008',
        "address": userDetails.address,
      },
    };
  
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Key ${mykey}`
      },
    };
  
    const { data } = await axios.post(url,payload, config);

    dispatch({
        type: PAYMENT_REQUEST,
      });
      
    dispatch({
        type:PAYMENT_SUCCESS,
        payload:data.payment_url,
    });

  } catch(error) {
    dispatch({
        type: PAYMENT_ERROR,
        payload: error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
      });
    }

}
  

// REDUCERS
export const paymentReducer = (state = {}, action) => {
    switch (action.type) {
      case PAYMENT_REQUEST:
        return {
          loading: true,
        };
  
      case PAYMENT_SUCCESS:
        return {
          loading: false,
          success: true,
        };
  
      case PAYMENT_ERROR:
        return {
          loading: false,
          error: action.payload,
        };
      
      default:
        return state;
    }
  };    