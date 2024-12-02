import React, { useState } from "react";
import "./Register.css";

const Register = () => {
  const [userType, setUserType] = useState("student");

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h1 className="register-title">Registracija</h1>
        <form className="register-form">
          {/* Izbor tipa korisnika */}
          <div className="form-group">
            <label htmlFor="userType">Tip korisnika</label>
            <select
              id="userType"
              className="form-input"
              value={userType}
              onChange={handleUserTypeChange}
            >
              <option value="student">Student</option>
              <option value="company">Kompanija</option>
            </select>
          </div>

          {/* Polja za studente */}
          {userType === "student" && (
            <>
              <div className="form-group">
                <label htmlFor="studentEmail">Email</label>
                <input
                  type="email"
                  id="studentEmail"
                  className="form-input"
                  placeholder="Unesite svoj email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="username">Korisničko ime</label>
                <input
                  type="text"
                  id="username"
                  className="form-input"
                  placeholder="Unesite korisničko ime"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Lozinka</label>
                <input
                  type="password"
                  id="password"
                  className="form-input"
                  placeholder="Unesite lozinku"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Ponovite Lozinku</label>
                <input
                  type="password"
                  id="password"
                  className="form-input"
                  placeholder="Ponovite lozinku"
                />
              </div>
            </>
          )}

          {/* Polja za kompanije */}
          {userType === "company" && (
            <>
              <div className="form-group">
                <label htmlFor="companyName">Naziv kompanije</label>
                <input
                  type="text"
                  id="companyName"
                  className="form-input"
                  placeholder="Unesite naziv kompanije"
                />
              </div>
              <div className="form-group">
                <label htmlFor="companyEmail">Email kompanije</label>
                <input
                  type="email"
                  id="companyEmail"
                  className="form-input"
                  placeholder="Unesite email kompanije"
                />
              </div>
              <div className="form-group">
                <label htmlFor="companyDescription">Opis kompanije</label>
                <textarea
                  id="companyDescription"
                  className="form-input"
                  placeholder="Napišite kratak opis kompanije"
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="companyCategory">Kategorija</label>
                <select id="companyCategory" className="form-input">
                  <option value="it">IT</option>
                  <option value="marketing">Marketing</option>
                  <option value="finance">Finansije</option>
                  <option value="education">Obrazovanje</option>
                  <option value="other">Ostalo</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="companyPassword">Lozinka</label>
                <input
                  type="password"
                  id="companyPassword"
                  className="form-input"
                  placeholder="Unesite lozinku"
                />
              </div>
              <div className="form-group">
                <label htmlFor="companyPassword">Ponovite Lozinku</label>
                <input
                  type="password"
                  id="companyPassword"
                  className="form-input"
                  placeholder="Ponovite lozinku"
                />
              </div>
            </>
          )}

          {/* Dugme za registraciju */}
          <button type="submit" className="register-button">
            Registrujte se
          </button>
          <p className="login-footer">
          Imate nalog? <a href="/">Prijavite se</a>
        </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
