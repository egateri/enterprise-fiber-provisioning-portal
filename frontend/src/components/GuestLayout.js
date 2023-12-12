import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function GuestLayout() {
  const token = localStorage.getItem("app_token");
  if(token) {
    return <Navigate to='/dashboard' />
  }
  return (
    <>
     <Outlet/>
    </>
   
  )
}

export default GuestLayout