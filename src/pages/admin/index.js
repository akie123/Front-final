import SideBar from './sidebar'
import React, { useEffect } from "react";
import ErrorPage from '../404page';
import { useDispatch, useSelector } from "react-redux";
import "./admin.css"


function Index () {

      const validauth = useSelector((state) => state.validauth)
      const dispatch = useDispatch()
      useEffect(() => {
        const items = JSON.parse(localStorage.getItem('items'))
        if(items){
          if(items.user === "Admin"){
            dispatch({type : "setTrue"})
          }
        }
      },[])
      return (
        validauth === true ? <SideBar/> : <ErrorPage/>
      );
  }
  
  export default Index