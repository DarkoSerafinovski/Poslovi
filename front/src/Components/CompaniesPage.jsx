import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CompaniesPage.css";
import Navigation from "./Navigation";

const CompaniesPage = () => {
  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: "Tech Solutions",
      imageUrl: "https://via.placeholder.com/100",
      description: "IT kompanija specijalizovana za razvoj softverskih rešenja.",
      category: "IT",
    },
    {
      id: 2,
      name: "Creative Marketing",
      imageUrl: "https://via.placeholder.com/100",
      description: "Agencija za marketing sa fokusom na digitalne kampanje.",
      category: "Marketing",
    },
    {
      id: 3,
      name: "Finance Experts",
      imageUrl: "https://via.placeholder.com/100",
      description: "Finansijski konsultanti za poslovne analize i investicije.",
      category: "Finansije",
    },
    {
      id: 4,
      name: "EduPro Academy",
      imageUrl: "https://via.placeholder.com/100",
      description: "Platforma za online obrazovanje i kurseve.",
      category: "Obrazovanje",
    },
    {
      id: 5,
      name: "General Services",
      imageUrl: "https://via.placeholder.com/100",
      description: "Raznovrsne usluge za svakodnevne potrebe.",
      category: "Ostalo",
    },
  ]);

  const [categories, setCategories] = useState([
    { id: 1, name: "IT" },
    { id: 2, name: "Marketing" },
    { id: 3, name: "Finansije" },
    { id: 4, name: "Obrazovanje" },
    { id: 5, name: "Ostalo" },
  ]);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  const handleCardClick = (companyId) => {
    navigate(`/kompanije/${companyId}`);
  };

  const filteredCompanies = selectedCategory
    ? companies.filter(
        (company) => company.category === selectedCategory.name
      )
    : companies;

  return (
    <>
      <Navigation />
      <div className="companies-container">
        {/* Sidebar */}
        <div className="sidebar">
          <h3>Filteri</h3>
          <h4>Kategorije</h4>
          <ul>
            {categories.map((category) => (
              <li
                key={category.id}
                className={selectedCategory === category ? "selected" : ""}
                onClick={() =>
                  setSelectedCategory(
                    selectedCategory === category ? null : category
                  )
                }
              >
                {category.name}
              </li>
            ))}
          </ul>
          <button
            className="reset-button"
            onClick={() => setSelectedCategory(null)}
          >
            Resetuj filtere
          </button>
        </div>

        {/* Main content */}
        <div className="companies-main">
          <h1 className="companies-title">Sve Kompanije</h1>
          <div className="companies-grid">
            {filteredCompanies.map((company) => (
              <div
                key={company.id}
                className="company-card"
                onClick={() => handleCardClick(company.id)}
              >
                <div className="company-image">
                  <img src={company.imageUrl} alt={company.name} />
                </div>
                <div className="company-info">
                  <h2 className="company-name">{company.name}</h2>
                  <p className="company-description">{company.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CompaniesPage;
