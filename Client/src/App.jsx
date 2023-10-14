import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./Pages/auth/Login";
import Register from "./Pages/auth/Register";
import Home from "./Pages/Home";
import Header from "./Components/nav/Header";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import RegisterComplete from "./Pages/auth/RegisterComplete";
import { useDispatch } from "react-redux";
import { auth } from "./firebase";
import ForgotPassword from "./Pages/auth/ForgotPassword";
import { currentUser } from "./APIs/auth";
import History from "./Pages/user/History";
import UserRoute from "./Routes/UserRoute";
import Password from "./Pages/user/Password";
import Wishlist from "./Pages/user/Wishlist";
import AdminRoute from "./Routes/AdminRoute";
import CategoryCreate from "./Pages/admin/Category/CategoryCreate";
import CategoryUpdate from "./Pages/admin/Category/CategoryUpdate";
import SubCreate from "./Pages/admin/Sub/SubCreate";
import SubUpdate from "./Pages/admin/Sub/Subupdate";
import ProductCreate from "./Pages/admin/Product/ProductCreate";
import AdminDasboard from "./Pages/admin/AdminDasboard";
import UpdateProfile from "./Pages/auth/UpdateProfile";
import AllProducts from "./Pages/admin/Product/AllProduct";
import ProductUpdate from "./Pages/admin/Product/ProductUpdate";
import Product from "./Pages/Product";
import CategoryHome from "./Components/Category/CategoryHome";
import SubHome from "./Components/Category/SubHome";
import SearchFilter from "./Components/Filter/SearchFilter";
import Cart from "./Pages/user/Cart";
import SideDrawer from "./Components/drawer/SideDrawer";
import Checkout from "./Pages/user/Checkout";
import CreateCoupon from "./Pages/admin/coupon/CreateCoupon";
import Payment from "./Pages/user/Payment";

function App() {
  const [userRole, setUserRole] = useState(null);
  const dispatch = useDispatch();

  const [location, setLocation] = useState("");

  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();

        currentUser(idTokenResult.token)
          .then((res) => {
            setUserRole(res.role);
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.name,
                email: res.email,
                token: idTokenResult.token,
                role: res.role,
                _id: res._id,
              },
            });
          })
          .catch((err) => console.log("err responding from app.jsx", err));
      }
    });

    return () => {
      unSubscribe();
    };
  }, [dispatch]);

  let locationPath = useLocation();

  useEffect(() => {
    setLocation(locationPath.pathname);
  }, [locationPath]);

  const renderHeader = location !== "/user/history" &&
    location !== "/admin/dashboard" && <Header path={location} />;

  return (
    <>
      <ToastContainer />
      {renderHeader}
      <SideDrawer />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/shop" element={<SearchFilter />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/register/complete" element={<RegisterComplete />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/forgot/password" element={<ForgotPassword />} />
        <Route exact path="/product/:slug" element={<Product />} />
        <Route path="/category/:slug" element={<CategoryHome />} />
        <Route path="/sub/:slug" element={<SubHome />} />
        <Route path="/cart" element={<Cart />} />
        <Route element={<UserRoute />}>
          <Route exact path="/user/history" element={<History />} />
          <Route exact path="/user/password" element={<Password />} />
          <Route exact path="/user/wishlist" element={<Wishlist />} />
          <Route exact path="/payment" element={<Payment />} />
          <Route exact path="/user/profile" element={<UpdateProfile />} />
          <Route exact path="/checkout" element={<Checkout />} />
        </Route>
        <Route
          element={<AdminRoute allowedRoles={["admin"]} userRole={userRole} />}
        >
          <Route path="/admin/category" element={<CategoryCreate />} />
          <Route path="/admin/coupon" element={<CreateCoupon />} />
          <Route path="/admin/category/:slug" element={<CategoryUpdate />} />
          <Route path="/admin/sub" element={<SubCreate />} />
          <Route path="/admin/sub/:slug" element={<SubUpdate />} />
          <Route path="/admin/product" element={<ProductCreate />} />
          <Route path="/admin/dashboard" element={<AdminDasboard />} />
          <Route path="/admin/products" element={<AllProducts />} />
          <Route path="/admin/product/:slug" element={<ProductUpdate />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
