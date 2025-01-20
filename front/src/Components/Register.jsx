import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Register.css";
import { useNavigate } from "react-router-dom";



const Register = () => {
  const [userType, setUserType] = useState("student");
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
    role: "student",
    ime: "",
    prezime: "",
    fakultet: "",
    godina_studija: "",
    naziv: "",
    opis: "",
    kategorija_id: "",
    logo: null,
  });
  const navigate = useNavigate();

  // Preuzimanje kategorija za kompanije
  useEffect(() => {
    if (userType === "company") {
      axios
        .get("http://localhost:8000/api/kompanije/kategorije", {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("auth_token")}`,
          },
        })
        .then((response) => {
          setCategories(response.data.data);
        })
        .catch((error) => {
          console.error("Greška prilikom preuzimanja kategorija:", error);
        });
    }
  }, [userType]);

  // Obrada promene u formi
  const handleInputChange = (e) => {
    const { id, value, files } = e.target;
    if (files) {
      setFormData((prevData) => ({ ...prevData, [id]: files[0] }));
    } else {
      setFormData((prevData) => ({ ...prevData, [id]: value }));
    }
  };

  // Obrada slanja forme
  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.repeatPassword) {
      alert("Lozinke se ne podudaraju!");
      return;
    }

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) payload.append(key, value);
    });

    axios
      .post("http://localhost:8000/api/register", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${sessionStorage.getItem("auth_token")}`,
        },
      })
      .then((response) => {
        if(response.data.success===true){
          alert("Uspešna registracija!");
          navigate('/');
        }else{
          alert('Neuspesna registracija, pokusajte ponovo');
        }
      
      })
      .catch((error) => {
        console.error("Greška prilikom registracije:", error);
      });
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h1 className="register-title">Registracija</h1>
        <form className="register-form" onSubmit={handleSubmit}>
          {/* Izbor tipa korisnika */}
          <div className="form-group">
            <label htmlFor="userType">Tip korisnika</label>
            <select
              id="role"
              className="form-input"
              value={userType}
              onChange={(e) => {
                setUserType(e.target.value);
                handleInputChange(e);
              }}
            >
              <option value="student">Student</option>
              <option value="company">Kompanija</option>
              <option value="alumni">Alumni</option>
            </select>
          </div>

          {/* Dinamički prikaz polja */}
          {userType === "student" && (
            <>
              <div className="form-group">
                <label htmlFor="ime">Ime</label>
                <input
                  type="text"
                  id="ime"
                  className="form-input"
                  onChange={handleInputChange}
                  placeholder="Unesite svoje ime"
                />
              </div>
              <div className="form-group">
                <label htmlFor="prezime">Prezime</label>
                <input
                  type="text"
                  id="prezime"
                  className="form-input"
                  onChange={handleInputChange}
                  placeholder="Unesite svoje prezime"
                />
              </div>
              <div className="form-group">
                <label htmlFor="fakultet">Fakultet</label>
                <input
                  type="text"
                  id="fakultet"
                  className="form-input"
                  onChange={handleInputChange}
                  placeholder="Unesite naziv fakulteta"
                />
              </div>
              <div className="form-group">
                <label htmlFor="godina_studija">Godina studija</label>
                <input
                  type="number"
                  id="godina_studija"
                  className="form-input"
                  onChange={handleInputChange}
                  placeholder="Unesite godinu studija"
                />
              </div>
            </>
          )}

          {userType === "company" && (
            <>
              <div className="form-group">
                <label htmlFor="naziv">Naziv kompanije</label>
                <input
                  type="text"
                  id="naziv"
                  className="form-input"
                  onChange={handleInputChange}
                  placeholder="Unesite naziv kompanije"
                />
              </div>
              <div className="form-group">
                <label htmlFor="opis">Opis kompanije</label>
                <textarea
                  id="opis"
                  className="form-input"
                  onChange={handleInputChange}
                  placeholder="Napišite kratak opis kompanije"
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="kategorija_id">Kategorija</label>
                <select
                  id="kategorija_id"
                  className="form-input"
                  onChange={handleInputChange}
                >
                  <option value="">Izaberite kategoriju</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.naziv}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="logo">Logo</label>
                <input
                  type="file"
                  id="logo"
                  className="form-input"
                  onChange={handleInputChange}
                />
              </div>
            </>
          )}

          <div className="form-group">
            <label htmlFor="username">Korisničko ime</label>
            <input
              type="text"
              id="username"
              className="form-input"
              onChange={handleInputChange}
              placeholder="Unesite korisničko ime"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="form-input"
              onChange={handleInputChange}
              placeholder="Unesite svoj email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Lozinka</label>
            <input
              type="password"
              id="password"
              className="form-input"
              onChange={handleInputChange}
              placeholder="Unesite lozinku"
            />
          </div>
          <div className="form-group">
            <label htmlFor="repeatPassword">Ponovite Lozinku</label>
            <input
              type="password"
              id="repeatPassword"
              className="form-input"
              onChange={handleInputChange}
              placeholder="Ponovite lozinku"
            />
          </div>

          <button type="submit" className="register-button">
            Registrujte se
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
