import "./sidebar.scss";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import {signOut} from "firebase/auth";
import {auth} from "../../firebase";
const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);

  const logOut = async () => {
    try {await signOut(auth);}
    catch (err) {
      console.error(err);
    }
  }
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/users" style={{ textDecoration: "none" }}>
          <span className="logo">Dr.Bouhenache</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Clients</span>
            </li>
          </Link>
          
         

          <li >
          <button onClick={logOut}><ExitToAppIcon className="icon" />
            <span >Logout</span></button>
            
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
