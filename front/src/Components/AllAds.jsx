import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Dodali smo useNavigate
import Navigation from "./Navigation";
import "./AllAds.css";

const AllAds = () => {
  const [ads, setAds] = useState([]);
  const navigate = useNavigate(); // Dodali smo useNavigate

  useEffect(() => {
    const fetchAds = async () => {
      const sampleAds = [
        { id: 1, title: "Junior React Developer", company: "TechCorp", location: "Beograd", type: "Posao" },
        { id: 2, title: "Senior Backend Developer", company: "DevHouse", location: "Novi Sad", type: "Posao" },
        { id: 3, title: "UI/UX Designer Intern", company: "Creative Studio", location: "Niš", type: "Praksa" },
      ];
      setAds(sampleAds);
    };

    fetchAds();
  }, []);

  // Funkcija za navigaciju na stranicu oglasa
  const handleAdClick = (adId) => {
    navigate(`/all-ads/${adId}`);
  };

  return (
    <>
      <Navigation />
      <div className="all-ads-container">
        <h1 className="page-title">Svi Oglasi</h1>
        <div className="ads-list">
          {ads.map((ad) => (
            <div
              className="ad-card"
              key={ad.id}
              onClick={() => handleAdClick(ad.id)} // Dodali smo onClick
              style={{ cursor: "pointer" }} // Promena kursora
            >
              <div className={`ad-type ${ad.type === "Posao" ? "job" : "internship"}`}>
                {ad.type}
              </div>
              <h2 className="ad-title">{ad.title}</h2>
              <p className="ad-company">{ad.company}</p>
              <p className="ad-location">{ad.location}</p>
              <button className="apply-button">Prijavi se</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllAds;
