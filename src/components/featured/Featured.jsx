import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
//ended up not using this page
const Featured = () => {
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Clients</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        
        <p className="title">Total des clients depuis l'ouverture du site</p>
        <p className="amount">1620</p>
        <p className="desc">
          le nombre affiché ici est le nombre de clients ayant pris rendez-vous sur la plateforme
        </p>
        <div className="summary">
          
          <div className="item">
            <div className="itemTitle">Derniere semaine</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">24</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Dernier mois</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">110</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
