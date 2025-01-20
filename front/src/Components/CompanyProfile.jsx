import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CompanyProfile.css";
import Navigation from "./Navigation";

const CompanyProfile = () => {
  const [user, setUser] = useState(null);
  const [company, setCompany] = useState(null);
  const [categories, setCategories] = useState([]); // Čuva kategorije za combobox
  const [isEditing, setIsEditing] = useState(false);
  const [editedCompany, setEditedCompany] = useState({});
  const[file,setFile]=useState(null);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const userId = sessionStorage.getItem("user_id");
        const response = await axios.get(`http://localhost:8000/api/kompanije/${userId}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("auth_token")}`,
          },
        });
        const data = response.data.data;

        setUser({
          id: data.id,
          username: data.username,
          email: data.email,
          role: data.role,
        });

        setCompany({ ...data.details, email: data.email });
        setEditedCompany({ ...data.details, email: data.email });
      } catch (error) {
        console.error("Greška prilikom učitavanja podataka:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/kompanije/kategorije", {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("auth_token")}`,
          },
        });
        setCategories(response.data.data);
      } catch (error) {
        console.error("Greška prilikom učitavanja kategorija:", error);
      }
    };

    fetchCompanyData();
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCompany((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = categories.find((cat) => cat.id === parseInt(e.target.value));
    setEditedCompany((prev) => ({ ...prev, kategorija: selectedCategory }));
  };

  const handleImageUpload = (e) => {
    const loadFile = e.target.files[0];
    if (loadFile) {
      setEditedCompany((prev) => ({ ...prev, logo: loadFile }));
  
      const reader = new FileReader();
      reader.onload = () => setFile(reader.result);
      reader.readAsDataURL(loadFile);
    }
  };
  
  const saveProfile = async () => {
    try {
      const userId = sessionStorage.getItem("user_id");
      const formData = new FormData();
      formData.append("_method", "PUT");
      formData.append("naziv", editedCompany.naziv);
      formData.append("email", editedCompany.email); 
      formData.append("opis", editedCompany.opis);
      if (editedCompany.kategorija) {
        formData.append("kategorija_id", editedCompany.kategorija.id);
      }
      if (editedCompany.logo) {
        formData.append("logo", editedCompany.logo);
      }

    console.log(editedCompany);
      await axios.post(`http://localhost:8000/api/kompanije/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("auth_token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setCompany({ ...editedCompany });
      setIsEditing(false);
    } catch (error) {
      console.error("Greška prilikom čuvanja podataka:", error);
    }
  };

  if (!user || !company) {
    return <p>Učitavanje...</p>;
  }

  return (
    <>
      <Navigation />
              <div className="company-profile">
                {!isEditing ? (
                  <>
                  <div className="profile-header">
          <img
            src={
              file
                ? file
                : editedCompany.logo instanceof File
                ? URL.createObjectURL(editedCompany.logo)
                : editedCompany.logo
            }
            alt="Company Logo"
            className="company-logo"
          />
          <h1>{company.naziv}</h1>
        </div>

            <div className="profile-info">
              <p>
                <strong>Korisničko ime:</strong> {user.username}
              </p>
              <p>
                <strong>Email:</strong> {company.email}
              </p>
              <p>
                <strong>Kategorija poslovanja:</strong> {company.kategorija?.naziv}
              </p>
              <p>
                <strong>Opis:</strong> {company.opis}
              </p>
            </div>
            <button className="edit-btn" onClick={() => setIsEditing(true)}>
              Uredi Profil
            </button>
          </>
        ) : (
          <form className="edit-profile-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label>Naziv kompanije:</label>
              <input
                type="text"
                name="naziv"
                value={editedCompany.naziv}
                onChange={handleInputChange}
                required
              />
            </div>

          <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={editedCompany.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Opis:</label>
              <textarea
                name="opis"
                value={editedCompany.opis}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label>Kategorija poslovanja:</label>
              <select
                name="kategorija"
                value={editedCompany.kategorija?.id || ""}
                onChange={handleCategoryChange}
                required
              >
                <option value="">Odaberite kategoriju</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.naziv}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Logo:</label>
              <input type="file" accept="image/*" onChange={handleImageUpload} />
              {editedCompany.logo && (
                <img
                  src={file}
                  alt="Uploaded Logo Preview"
                  className="uploaded-logo"
                />
              )}
            </div>
            <button className="save-btn" onClick={saveProfile}>
              Sačuvaj
            </button>
            <button className="cancel-btn" onClick={() => setIsEditing(false)}>
              Otkaži
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default CompanyProfile;
