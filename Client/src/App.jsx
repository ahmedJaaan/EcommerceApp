import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Pages/auth/Login'
import Register from './Pages/auth/Register'
import Home from './Pages/Home'
import Header from './Components/nav/Header'


function App() {
return (
  <>

  <Header />
  <Routes>
    <Route exact path='/' element={<Home />}/>
    <Route exact path='/register' element={<Register />}/>
    <Route exact path='/login' element={<Login />}/>
  </Routes>
  </>
)
}


export default App