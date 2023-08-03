import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import BookScreen from "./screens/BookScreen";
import CartScreen from "./screens/CartScreen";
import ProfileScreen from "./screens/ProfileScreen";
import OkScreen from "./screens/okScreen";
import RegisterScreen from "./screens/RegisterScreen";
import UserProfileEditScreen from "./screens/UserProfileEditScreen";
import UserListScreen from "./screens/admin/UserListScreen";
import UserEditScreen from "./screens/admin/UserEditScreen";
import BookListScreen from "./screens/admin/BookListScreen";
import BookCreateScreen from "./screens/BookCreateScreen";
import BookEditScreen from "./screens/BookEditScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import CategoryScreen from "./screens/CategoryScreen";
import OrderListScreen from "./screens/admin/OrderListScreen";
import MyOrderScreen from "./screens/MyOrderScreen";
import Loader from "./components/Loader";
import BookRequestScreen from "./screens/BookRequestScreen";
import MyBookScreen from "./screens/MyBookScreen";
import "react-toastify/dist/ReactToastify.css";
import MyBookRequest from "./screens/MyBookRequest";
import RequestsListScreen from "./screens/admin/RequestsListScreen";
import { ToastContainer, toast } from "react-toastify";


function App() {
  return (
    <>
      <Header />
      <ToastContainer/>
      <div style={{ background: "#f5f5f5" }}>
        <Routes>
          <Route path="/" element={<HomeScreen />} exact />
          <Route path="/category" element={<CategoryScreen />} exact />
          <Route path="/login" element={<LoginScreen />} exact />
          <Route path="/register" element={<RegisterScreen />} exact />
          <Route path="/book/:id" element={<BookScreen />} exact />
          <Route exact path="/cart/:id?" element={<CartScreen />} />

          <Route exact path="/shipping" element={<ShippingScreen />} />
          <Route exact path="/payment" element={<PaymentScreen />} />
          <Route exact path="/placeorder" element={<PlaceOrderScreen />} />
          <Route exact path="/order/:id" element={<OrderScreen />} />
          <Route exact path="/profile" element={<ProfileScreen />} />
          <Route exact path="/my-orders" element={<MyOrderScreen />} />
          <Route exact path="/book-request" element={<BookRequestScreen />} />
          <Route exact path="/my-book-requests" element={<MyBookRequest />} />
          <Route exact path="/my-books" element={<MyBookScreen />} />
          <Route
            exact
            path="/profile-edit"
            element={<UserProfileEditScreen />}
          />
          <Route
            exact
            path="admin/user/:id/edit"
            element={<UserEditScreen />}
          />

          <Route exact path="/admin/userlist" element={<UserListScreen />} />
          <Route exact path="admin/booklist" element={<BookListScreen />} />
          <Route exact path="admin/orderlist" element={<OrderListScreen />} />
          <Route
            exact
            path="admin/requestlist"
            element={<RequestsListScreen />}
          />
          <Route
            exact
            path="admin/book-create"
            element={<BookCreateScreen />}
          />
          <Route
            exact
            path="admin/book/:id/edit"
            element={<BookEditScreen />}
          />
          <Route exact path="/mybook/:id/edit" element={<BookEditScreen />} />
          <Route exact path="/book/create" element={<BookCreateScreen />} />
          <Route path="/loader" element={<Loader />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
