import "./navbar.scss";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import {  useState,useContext } from "react";


const Navbar = () => {

  const { dispatch } = useContext(DarkModeContext);
  const [darkmode,setDarkMode]= useState(false);
  
  const ModeChanger =  () => {
    setDarkMode(!darkmode);
    dispatch({ type: "TOGGLE" })

  };

  return (
    
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
        Plateforme d'assistant medical
        </div>
        <div className="items">

          <div className="item">
            <LanguageOutlinedIcon className="icon" />
            Français
          </div>
          <div className="item">
            {!darkmode ?  <DarkModeOutlinedIcon
              className="icon"
              onClick={() => ModeChanger()}
            /> : <LightModeIcon className="icon"
            onClick={() => ModeChanger()} /> }
           
          </div>

          <div className="item">
            <img
              src="https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
              className="avatar"
            />
          </div>
        </div>
      </div>
    </div>
   

  );
};

export default Navbar;
