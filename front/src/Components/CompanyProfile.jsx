import React, { useState } from "react";
import "./CompanyProfile.css";
import Navigation from "./Navigation";

const CompanyProfile = () => {
  const [company, setCompany] = useState({
    name: "Tech Solutions d.o.o.",
    email: "info@techsolutions.com",
    description:
      "Tech Solutions d.o.o. je vodeća kompanija u razvoju softverskih rešenja, sa fokusom na inovativne i prilagodljive usluge za klijente širom sveta.",
    category: "Razvoj softvera",
    logo: "https://via.placeholder.com/150", // Link do logo slike
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedCompany, setEditedCompany] = useState({ ...company });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCompany((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (e) => {
    setEditedCompany((prev) => ({ ...prev, category: e.target.value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setEditedCompany((prev) => ({ ...prev, logo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const saveProfile = () => {
    setCompany({ ...editedCompany });
    setIsEditing(false);
  };

  return (
    <>
        <Navigation/>
        <div className="company-profile">
        {!isEditing ? (
            <>
            <div className="profile-header">
                <img src={company.logo} alt="Company Logo" className="company-logo" />
                <h1>{company.name}</h1>
            </div>
            <div className="profile-info">
                <p>
                <strong>Email:</strong> {company.email}
                </p>
                <p>
                <strong>Kategorija poslovanja:</strong> {company.category}
                </p>
                <p>
                <strong>Opis:</strong> {company.description}
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
                name="name"
                value={editedCompany.name}
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
                <label>Kategorija poslovanja:</label>
                <select
                name="category"
                value={editedCompany.category}
                onChange={handleCategoryChange}
                required
                >
                <option value="Razvoj softvera">Razvoj softvera</option>
                <option value="Konsalting">Konsalting</option>
                <option value="IT usluge">IT usluge</option>
                <option value="E-commerce">E-commerce</option>
                <option value="Marketing">Marketing</option>
                <option value="Obrazovanje">Obrazovanje</option>
                <option value="Zdravstvo">Zdravstvo</option>
                </select>
            </div>
            <div className="form-group">
                <label>Opis:</label>
                <textarea
                name="description"
                value={editedCompany.description}
                onChange={handleInputChange}
                required
                ></textarea>
            </div>
            <div className="form-group">
                <label>Logo:</label>
                <input type="file" accept="image/*" onChange={handleImageUpload} />
                {editedCompany.logo && (
                <img
                    src={editedCompany.logo}
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
