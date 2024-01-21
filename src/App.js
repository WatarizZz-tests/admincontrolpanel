import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { userInputs } from "./formSource";
import "./style/dark.scss";
import { DarkModeContext } from "./context/darkModeContext";
import React, { useContext } from "react";



function App() {
  const { darkMode } = useContext(DarkModeContext);
  
  
 
  
  return (
    <div className={darkMode ? "app dark" : "app"}>
    
    
      <BrowserRouter>
        <Routes>
          
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route
              index
              element={
                  <Home />
              }
            />
            <Route path="users">
              <Route
                index
                element={
                    <List />
                }
              />
              <Route
                path="new"
                element={
                    <New inputs={userInputs} title="Ajouter un nouveau patient" />
                }
              />
            </Route>
            <Route path="products">
              <Route
                index
                element={
                    <List />
                }
              />
              
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      
   
    </div> 
  );
}

export default App;
