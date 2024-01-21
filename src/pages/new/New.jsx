import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import {
  addDoc,
  collection,
} from "firebase/firestore";
import { db} from "../../firebase";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const New = () => {
  const [adressemail,setAdresseMail]= useState("");
  const [numerodetelephone,setNumeroDeTelephone]= useState("");
  const [description,setDescription]= useState("");
  const [nometprenom,setNomEtPrenom]= useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [showValidationMessage, setShowValidationMessage] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  


  const listeRendezVousRef = collection(db,"rdv");
  const act = "actif";

  const onSubmitrdv = async (e) => {
    e.preventDefault();
    try {
      await addDoc(listeRendezVousRef, {
        named:nometprenom,
        mail:adressemail,
        phone:numerodetelephone,
        desc:description,
        date: new Date().toLocaleDateString(),
        statut: act,
        daterdv: selectedDate.toLocaleString(),
        
        
      });
      setAdresseMail("");
  setDescription("");
  setNomEtPrenom("");
  setNumeroDeTelephone("");
  setSelectedDate(null);
  setShowValidationMessage(true);
    setValidationMessage(
      "Rendez-Vous confirmé, Merci."
    );

    } catch (err) {
      console.error(err);
  }
  
}

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Formulaire d'ajout de Rendez-Vous</h1>
        </div>
        <div className="bottom">
        <form >
          <div className="left">
          <label>Description de la maladie</label>
          <textarea rows="6" placeholder="Décrire les symptomes" onChange={(e) => setDescription(e.target.value)} value={description} />
          </div>
          <div className="right">
            
              <div className="formInput">
              <label>Nom et Prenom</label>
            <input type="text" onChange={(e) => setNomEtPrenom(e.target.value)} value={nometprenom} required></input>
            <label>Adresse Mail</label>
            <input type="email" onChange={(e) => setAdresseMail(e.target.value)} value={adressemail} required></input>
            <label>Numero de telephone</label>
            <input type="number"  maxLength={11} onChange={(e) => setNumeroDeTelephone(Number(e.target.value))} value={numerodetelephone} ></input>
            <div><label>Date du rendez vous</label><DatePicker
                              selected={selectedDate}
                              onChange={date => setSelectedDate(date)}
                              minDate={new Date()}
                              filterDate={date => date.getDay() !== 5}
                              placeholderText="Choisir une date"
                              dateFormat="dd/MM/yyyy hh:mm:ss"
                              showTimeSelect
                              
                            /></div>
              </div>
              </div>
            </form>
            <button className="Button1" onClick={onSubmitrdv} type="submit">
                Envoyer
              </button>
              {showValidationMessage && 
          <span className="validation-message">{validationMessage}</span>
        }
          
        </div>
      </div>
    </div>
  );
};

export default New;
