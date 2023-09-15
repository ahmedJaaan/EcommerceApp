import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Pages/auth/Login'
import Register from './Pages/auth/Register'
import Home from './Pages/Home'
import Header from './Components/nav/Header'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import RegisterComplete from './Pages/auth/RegisterComplete'
import { useDispatch } from 'react-redux'
import { auth } from './firebase'


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();

        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            email: user.email,
            token: idTokenResult.token,
          },
        });
      };
    }
    );
  }
  );


return (
  <>
    <ToastContainer /> 
  <Header />
  <Routes>
    <Route exact path='/' element={<Home />}/>
    <Route exact path='/register' element={<Register />}/>
    <Route exact path='/register/complete' element={<RegisterComplete />}/>
    <Route exact path='/login' element={<Login />}/>
  </Routes>
  </>
)
}


export default App