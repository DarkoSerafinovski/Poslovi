import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./CompanyDetail.css";
import Navigation from "./Navigation";

const CompanyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Dodali smo useNavigate
  const [company, setCompany] = useState(null);
  const [ads, setAds] = useState([]);

  useEffect(() => {
    // Simulirani podaci za kompaniju i njene oglase
    const fetchedCompany = {
      id,
      name: `Kompanija ${id}`,
      imageUrl: "https://via.placeholder.com/100",
      description: `Opis kompanije ${id}`,
    };

    const fetchedAds = [
      { id: 1, title: "Oglas 1 za Kompaniju " + id, description: "Opis oglasa 1" },
      { id: 2, title: "Oglas 2 za Kompaniju " + id, description: "Opis oglasa 2" },
      { id: 3, title: "Oglas 3 za Kompaniju " + id, description: "Opis oglasa 3" },
    ];

    setCompany(fetchedCompany);
    setAds(fetchedAds);
  }, [id]);

  // Funkcija za navigaciju do stranice oglasa
  const handleAdClick = (adId) => {
    navigate(`/all-ads/${adId}`);
  };

  return (
    <>
      <Navigation />
      <div className="company-detail-container">
        {company ? (
          <>
            <div className="company-detail-header">
              <h1>{company.name}</h1>
              <img
                src={company.imageUrl}
                alt={company.name}
                className="company-detail-image"
              />
              <p>{company.description}</p>
            </div>
            <div className="company-ads">
              <h2>Oglasi</h2>
              <div className="ads-list">
                {ads.map((ad) => (
                  <div
                    key={ad.id}
                    className="ad-card"
                    onClick={() => handleAdClick(ad.id)} // Dodali smo onClick
                    style={{ cursor: "pointer" }} // Promena kursora
                  >
                    <h3>{ad.title}</h3>
                    <p>{ad.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <p>Učitavanje...</p>
        )}
      </div>
    </>
  );
};

export default CompanyDetail;
