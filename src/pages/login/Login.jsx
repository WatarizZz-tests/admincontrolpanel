import React, { useState } from "react";
import "./login.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const navigate = useNavigate()


  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate("/users")
      })
      .catch((error) => {
        setError(true);
      });
  };

 


  return (
    <div className="login">
      <form onSubmit={signIn}>
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Se Connecter</button>
        {error && <span>adresse mail ou mot de passe invalide !</span>}
      </form>
    </div>
  );
};

export default Login;
