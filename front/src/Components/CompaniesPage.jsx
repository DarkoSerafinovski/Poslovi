import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CompaniesPage.css";
import Navigation from "./Navigation";

const CompaniesPage = () => {
  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: "Kompanija 1",
      imageUrl: "https://via.placeholder.com/100",
      description: "Opis kompanije 1",
    },
    {
      id: 2,
      name: "Kompanija 2",
      imageUrl: "https://via.placeholder.com/100",
      description: "Opis kompanije 2",
    },
    {
      id: 3,
      name: "Kompanija 3",
      imageUrl: "https://via.placeholder.com/100",
      description: "Opis kompanije 3",
    },
  ]);

  const navigate = useNavigate();

  const handleCardClick = (companyId) => {
    navigate(`/kompanije/${companyId}`);
  };

  return (
    <>
    <Navigation/>
    <div className="companies-container">
      <h1 className="companies-title">Sve Kompanije</h1>
      <div className="companies-grid">
        {companies.map((company) => (
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
    </>
  );
};

export default CompaniesPage;
