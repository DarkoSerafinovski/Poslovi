import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navigation from "./Navigation";
import "./MyAds.css";

const MyAds = () => {
  const [ads, setAds] = useState([]);
  const navigate = useNavigate();

  // Učitavanje oglasa sa servera
  useEffect(() => {
    const fetchMyAds = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/kompanije/oglasi", {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("auth_token")}`,
          },
        });
        setAds(response.data.data); // Pretpostavljamo da API vraća kolekciju oglasa
      } catch (error) {
        console.error("Greška prilikom učitavanja oglasa:", error);
      }
    };

    fetchMyAds();
  }, []);

  // Navigacija ka detaljima oglasa
  const handleAdClick = (adId) => {
    navigate(`/all-ads/${adId}`);
  };

  // Brisanje oglasa
  const handleDelete = async (adId) => {
    const confirmDelete = window.confirm("Da li sigurno želite da obrišete ovaj oglas?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8000/api/oglasi/${adId}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("auth_token")}`,
          },
        });
        setAds(ads.filter((ad) => ad.id !== adId)); 
      } catch (error) {
        console.error("Greška prilikom brisanja oglasa:", error);
      }
    }
  };

  return (
    <>
      <Navigation />
      <div className="my-ads-container">
        <h1 className="page-title">Naši Oglasi</h1>
        <div className="ads-list">
          {ads.map((ad) => (
            <div
              className="ad-card"
              key={ad.id}
              onClick={() => handleAdClick(ad.id)}
              style={{ cursor: "pointer" }}
            >
              <div className={`ad-type ${ad.tip === "posao" ? "job" : "internship"}`}>
                {ad.tip}
              </div>
              <h2 className="ad-title">{ad.kategorija.naziv}</h2>
              <p className="ad-category">{ad.naslov}</p>
              <p className="ad-company">{ad.firma}</p>
              <p className="ad-location">{ad.lokacija}</p>
              
              <button className="delete-button" onClick={(e) => { e.stopPropagation(); handleDelete(ad.id); }}>
                Obriši
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyAds;
