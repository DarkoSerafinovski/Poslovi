import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Držimo poruku greške
  const navigate = useNavigate();

  // Funkcija za login
  const handleLogin = async (event) => {
    event.preventDefault();
    setError(""); // Resetovanje greške pre pokušaja prijave

    try {
      // Slanje POST zahteva na API
      const response = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      });

      // Provera uspešnosti odgovora
      if (response.data.success) {
        const { access_token, role,data } = response.data;

        // Čuvanje tokena i uloge u sessionStorage
        sessionStorage.setItem("auth_token", access_token);
        sessionStorage.setItem("role", role);
        sessionStorage.setItem('user_id',data.id);
        if (role === "admin" || role === "student") {
          navigate("/all-ads");
        } else if (role === "company") {
          navigate("/account");
        } else if (role === "alumni") {
          navigate("/svi-postovi");
        }
      } else {
        setError("Neuspešna prijava. Proverite svoje podatke.");
      }
    } catch (err) {
      console.error("Greška prilikom prijave:", err);
      setError("Došlo je do greške. Molimo pokušajte ponovo.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Dobrodošli!</h1>
        <p className="login-subtitle">Prijavite se da biste nastavili.</p>
        {error && <p className="error-message">{error}</p>} {/* Prikaz greške */}
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
