import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'


const UpdateProfile = () => {
  const {user} = useSelector((state) => ({...state}));
useEffect(() => {
  console.log(user)
}, [])
  return (
    <div>UpdateProfile</div>
  )
}

export default UpdateProfile