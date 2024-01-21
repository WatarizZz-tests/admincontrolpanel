import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import { auth } from "../../firebase";
import React, {  useEffect, useState } from "react";
import { onAuthStateChanged  } from "firebase/auth";
import {  useNavigate } from 'react-router-dom';
const Home = () => {
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
    !authUser ?  navigate("/login") : navigate("/users");
  authUser &&  navigate("/users")
    
    

    return () => {
      listen();
    };
  }, []);

  return (
    
    <div className="home">
    <Sidebar />
      
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
        </div>
        <div className="charts">
          <Featured />  
          <Chart title="Les 6 derniers mois  (patients)" aspect={2 / 1} />
        </div>
        
        
      </div>
    </div>
  );
};

export default Home;
