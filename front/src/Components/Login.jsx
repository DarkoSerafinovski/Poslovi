import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Funkcija za login
  const handleLogin = (event) => {
    event.preventDefault();

    // Logika za proveru korisničkog unosa (npr. simulacija autentifikacije)
    if (email && password) {
      // Čuvanje uloge u sessionStorage za demonstraciju
      // Ova logika treba biti zamenjena stvarnom autentifikacijom
      sessionStorage.setItem("userRole", "student"); // Primer uloge

      // Preusmeravanje na odgovarajuće stranice na osnovu uloge
      const userRole = sessionStorage.getItem("userRole");
      if (userRole === "admin" || userRole === "student") {
        navigate("/all-ads");
      } else if (userRole === "company") {
        navigate("/account");
      }
    } else {
      alert("Molimo vas da unesete email i lozinku.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Dobrodošli!</h1>
        <p className="login-subtitle">Prijavite se da biste nastavili.</p>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder="Unesite svoj email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Lozinka</label>
            <input
              type="password"
              id="password"
              className="form-input"
              placeholder="Unesite svoju lozinku"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <button type="submit" className="login-button">
            Prijavi se
          </button>
        </form>
        <p className="login-footer">
          Nemate nalog? <a href="register">Registrujte se</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
