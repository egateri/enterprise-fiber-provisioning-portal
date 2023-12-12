import React from 'react'
import {  Navigate, Outlet } from 'react-router-dom'
import Header from './header/Header'


function DefaultLayout() {
    const name = localStorage.getItem("username");
    const token = localStorage.getItem("app_token");

    if(!token) {
      return <Navigate to='/login' />
    }

  return (
    <>
      <Header />
          <h2>Welcome {name} !</h2>
          <h2>You have successfully logged into Enterprise Provisioning portal.</h2>
      <Outlet/>
    </>
  
      )
}

export default DefaultLayout