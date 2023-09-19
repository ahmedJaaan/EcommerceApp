import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Pages/auth/Login';
import Register from './Pages/auth/Register';
import Home from './Pages/Home';
import Header from './Components/nav/Header';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import RegisterComplete from './Pages/auth/RegisterComplete';
import { useDispatch } from 'react-redux';
import { auth } from './firebase';
import ForgotPassword from './Pages/auth/ForgotPassword';
import { currentUser } from './APIs/auth';
import History from './Pages/user/History';
import UserRoute from './Routes/UserRoute';
import Password from './Pages/user/Password';
import Wishlist from './Pages/user/Wishlist';
import AdminRoute from './Routes/AdminRoute';
import CategoryCreate from './Pages/admin/Category/CategoryCreate';
import CategoryUpdate from './Pages/admin/Category/CategoryUpdate';
import SubCreate from "./Pages/admin/Sub/SubCreate"
import SubUpdate from './Pages/admin/Sub/Subupdate';


function App() {
  const [userRole, setUserRole] = useState(null);
  const dispatch = useDispatch();

 
  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
  
        currentUser(idTokenResult.token)
          .then((res) => {
            setUserRole(res.role);
            console.log("Response from currentUser API:", res); 
            dispatch({
              type: 'LOGGED_IN_USER',
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
  
  return (
    <>
      <ToastContainer />
      <Header />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/register/complete' element={<RegisterComplete />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/forgot/password' element={<ForgotPassword />} />
        <Route element={<UserRoute />}>
          <Route exact path='/user/history' element={<History />} />
          <Route exact path='/user/password' element={<Password />} />
          <Route exact path='/user/wishlist' element={<Wishlist />} />
        </Route>
        <Route element={<AdminRoute allowedRoles={['admin']} userRole={userRole} />}>
          <Route path="/admin/category" element={<CategoryCreate />} />
          <Route path="/admin/category/:slug" element={<CategoryUpdate />} />
          <Route path="/admin/sub" element={<SubCreate />} />
          <Route path="/admin/sub/:slug" element={<SubUpdate />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
