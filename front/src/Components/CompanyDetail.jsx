import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios"; // Dodajemo axios
import "./CompanyDetail.css";
import Navigation from "./Navigation";

const CompanyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const [ads, setAds] = useState([]);

  useEffect(() => {
    // Definiši URL za API
    const fetchCompanyData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/kompanije/${id}`, {
          headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('auth_token'),
          }
        });

        const { data } = response.data;
        
        setCompany({
          id: data.id,
          name: data.details.naziv, // Ako je 'username' naziv kompanije, koristi ga
          imageUrl: data.details.logo, // Logo kompanije
          description: data.details.opis, // Opis kompanije
        });

        setAds(data.details.oglasi.map(ad => ({
          id: ad.id,
          title: ad.naslov, // Oglasni naslov
          description: ad.opis, // Opis oglasa
        })));
      } catch (error) {
        console.error("Greška prilikom učitavanja podataka:", error);
      }
    };

    fetchCompanyData();
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
           
              <img
                src={company.imageUrl}
                alt={company.name}
                className="company-detail-image"
              />
                 <h1>{company.name}</h1>
              <p>{company.description}</p>
            </div>
            <div className="company-ads">
              <h2>Oglasi</h2>
              <div className="ads-list">
                {ads.length > 0 ? (
                  ads.map((ad) => (
                    <div
                      key={ad.id}
                      className="ad-card"
                      onClick={() => handleAdClick(ad.id)}
                      style={{ cursor: "pointer" }}
                    >
                      <h3>{ad.title}</h3>
                      <p>{ad.description}</p>
                    </div>
                  ))
                ) : (
                  <p>Oglasi nisu dostupni.</p>
                )}
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
