import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
  userloginReducer,
} from "./reducers/userReducers";
import {
  authorListReducer,
  bookCreateReducer,
  bookDeleteReducer,
  bookDetailsReducer,
  bookListReducer,
  bookRequestReducer,
  bookReviewCreateReducer,
  bookTopRatedReducer,
  bookUpdateReducer,
  categoryListReducer,
  markNotficationsReducer,
  myBookListReducer,
  myRequestBookListReducer,
  notificationsListReducer,
} from "./reducers/bookReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
  orderCreateReducer,
  orderDeliverReducer,
  orderDetailsReducer,
  orderListMyReducer,
  orderListReducer,
  orderPayReducer,
} from "./reducers/orderReducers";

const reducer = combineReducers({
  bookList: bookListReducer,
  mybooks: myBookListReducer,
  bookRequest: bookRequestReducer,
  notificationList:notificationsListReducer,
  markNotification:markNotficationsReducer,
  requestBooks: myRequestBookListReducer,
  bookDetails: bookDetailsReducer,
  bookCreate: bookCreateReducer,
  bookUpdate: bookUpdateReducer,
  bookDelete: bookDeleteReducer,
  bookTopRated: bookTopRatedReducer,
  bookReviewCreate: bookReviewCreateReducer,
  cart: cartReducer,

  categoryList: categoryListReducer,
  authorList: authorListReducer,

  userLogin: userloginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,

  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
  orderDeliver: orderDeliverReducer,
});

const userLoginFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : [];

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const initialState = {
  userLogin: { userInfo: userLoginFromStorage },
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
