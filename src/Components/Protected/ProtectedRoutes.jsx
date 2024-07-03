import React from 'react'
import { Navigate } from 'react-router-dom';

export default function ProtectedRoutes({children}) {


    const token = localStorage.getItem('userToken');//to get token from localStorage

    if (!token) {
        return <Navigate to= '/Login' />

    }
  return  children;// the sth which the user want it will return
   
}
