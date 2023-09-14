import React from 'react'

const Register = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
      <input
      type='email'
      
       /> 
      </form>
    </div>
  )
}

export default Register