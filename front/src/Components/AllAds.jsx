import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "./Navigation";
import "./AllAds.css";

const AllAds = () => {
  const [ads, setAds] = useState([]);
  const [categories, setCategories] = useState([]); // Lista kategorija
  const [types, setTypes] = useState([]); // Lista tipova oglasa
  const [filteredAds, setFilteredAds] = useState([]); // Filtrirani oglasi
  const [selectedCategory, setSelectedCategory] = useState(null); // Izabrana kategorija
  const [selectedType, setSelectedType] = useState(null); // Izabrani tip
  const navigate = useNavigate();

  useEffect(() => {
    // Fikstivni podaci za oglase, kategorije i tipove
    const sampleAds = [
      { id: 1, title: "Junior React Developer", company: "TechCorp", location: "Beograd", type: "Front-end", category: "Posao" },
      { id: 2, title: "Senior Backend Developer", company: "DevHouse", location: "Novi Sad", type: "Back-end", category: "Posao" },
      { id: 3, title: "UI/UX Designer Intern", company: "Creative Studio", location: "Niš", type: "UI/UX Designer", category: "Praksa" },
    ];

    const sampleCategories = [
      { id: 1, name: "Posao" },
      { id: 2, name: "Praksa" },
    ];

    const sampleTypes = [
      { id: 1, name: "Front-end" },
      { id: 2, name: "Back-end" },
      { id: 3, name: "Full-stack" },
      { id: 4, name: "DevOps" },
      { id: 5, name: "Mobile Development" },
      { id: 6, name: "Data Science" },
      { id: 7, name: "QA Engineer" },
      { id: 8, name: "UI/UX Designer" },
    ];

    setAds(sampleAds);
    setFilteredAds(sampleAds); // Inicijalno prikaži sve oglase
    setCategories(sampleCategories);
    setTypes(sampleTypes);
  }, []);

  useEffect(() => {
    // Filtriranje oglasa na osnovu kategorije i tipa
    let filtered = ads;

    if (selectedCategory) {
      filtered = filtered.filter((ad) => ad.category === selectedCategory.name);
    }

    if (selectedType) {
      filtered = filtered.filter((ad) => ad.type === selectedType.name);
    }

    setFilteredAds(filtered);
  }, [selectedCategory, selectedType, ads]);

  const handleAdClick = (adId) => {
    navigate(`/all-ads/${adId}`);
  };

  return (
    <>
      <Navigation />
      <div className="all-ads-container">
        {/* Sidebar za filtere */}
        <div className="sidebar">
          <h3>Filteri</h3>

          {/* Filter po kategorijama */}
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

          {/* Filter po tipovima */}
          <h4>Tipovi oglasa</h4>
          <ul>
            {types.map((type) => (
              <li
                key={type.id}
                className={selectedType === type ? "selected" : ""}
                onClick={() =>
                  setSelectedType(selectedType === type ? null : type)
                }
              >
                {type.name}
              </li>
            ))}
          </ul>

          <button
            className="reset-button"
            onClick={() => {
              setSelectedCategory(null);
              setSelectedType(null);
            }}
          >
            Resetuj filtere
          </button>
        </div>

        {/* Lista oglasa */}
        <div className="ads-section">
          <h1 className="page-title">Svi Oglasi</h1>
          <div className="ads-list">
            {filteredAds.map((ad) => (
              <div
                className="ad-card"
                key={ad.id}
                onClick={() => handleAdClick(ad.id)}
                style={{ cursor: "pointer" }}
              >
                <div
                  className={`ad-type ${
                    ad.category === "Posao" ? "job" : "internship"
                  }`}
                >
                  {ad.category}
                </div>
                <h2 className="ad-title">{ad.title}</h2>
                <p className="ad-company">{ad.company}</p>
                <p className="ad-location">{ad.location}</p>
                
                <button className="apply-button">Pogledaj oglas</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllAds;
