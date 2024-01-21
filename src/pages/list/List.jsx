import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable";
import { auth } from "../../firebase";
import { onAuthStateChanged  } from "firebase/auth";
import {  useNavigate } from 'react-router-dom';
import React, {  useEffect, useState } from "react";

const List = () => {

  const [authUser, setAuthUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);
  return (
    <div className="list">
      <div >
        
        {!authUser &&  navigate("/login")
        }
        </div>
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Datatable/>
      </div>
      
    </div>
  )
}

export default List