import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "./Navigation";
import "./MyAds.css";

const MyAds = () => {
  const [ads, setAds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyAds = async () => {
      const myAds = [
        { id: 1, title: "Junior React Developer", company: "TechCorp", location: "Beograd", type: "Posao" },
        { id: 2, title: "Senior Backend Developer", company: "DevHouse", location: "Novi Sad", type: "Posao" },
        { id: 3, title: "UI/UX Designer Intern", company: "Creative Studio", location: "Niš", type: "Praksa" },
      ];
      setAds(myAds);
    };

    fetchMyAds();
  }, []);

  const handleAdClick = (adId) => {
    navigate(`/all-ads/${adId}`);
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
              <div className={`ad-type ${ad.type === "Posao" ? "job" : "internship"}`}>
                {ad.type}
              </div>
              <h2 className="ad-title">{ad.title}</h2>
              <p className="ad-company">{ad.company}</p>
              <p className="ad-location">{ad.location}</p>
              
              <button className="delete-button">Obriši</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyAds;
