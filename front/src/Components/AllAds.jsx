import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "./Navigation";
import axios from "axios";
import "./AllAds.css";

const AllAds = () => {
  const [ads, setAds] = useState([]); // Oglasi
  const [categories, setCategories] = useState([]); // Kategorije
  const [types] = useState([ // Tipovi oglasa
    { id: 1, name: "posao" },
    { id: 2, name: "praksa" }
  ]);
  const [filteredAds, setFilteredAds] = useState([]); // Filtrirani oglasi
  const [selectedCategory, setSelectedCategory] = useState(null); // Izabrana kategorija
  const [selectedType, setSelectedType] = useState(null); // Izabrani tip
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0
  });
  const postsPerPage = 10; // Broj oglasa po stranici
  const navigate = useNavigate();

  useEffect(() => {
    // Učitaj kategorije
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/kategorije', {
          headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('auth_token'),
          }
        });
        setCategories(response.data.data);
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    // Filtriranje i učitavanje oglasa sa servera
    const fetchAds = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/oglasi', {
          params: {
            page: pagination.currentPage,
            per_page: postsPerPage,
            kategorija_id: selectedCategory ?  selectedCategory.id  : null,
            tip: selectedType ? selectedType.name : null,
          },
          headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('auth_token'),
          }
        });

        setAds(response.data.data);
        console.log(response.data.data);
        setPagination({
          currentPage: response.data.meta.current_page,
          totalPages: response.data.meta.last_page,
          totalItems: response.data.meta.total,
        });
      } catch (error) {
        console.error('Error loading ads:', error);
      }
    };

    fetchAds();
  }, [selectedCategory, selectedType, pagination.currentPage]);

  const handleAdClick = (adId) => {
    navigate(`/all-ads/${adId}`);
  };

  // Handle pagination
  const handleNextPage = () => {
    if (pagination.currentPage < pagination.totalPages) {
      setPagination(prev => ({
        ...prev,
        currentPage: prev.currentPage + 1,
      }));
    }
  };

  const handlePrevPage = () => {
    if (pagination.currentPage > 1) {
      setPagination(prev => ({
        ...prev,
        currentPage: prev.currentPage - 1,
      }));
    }
  };

  if(!categories){
    <p>Ucitavanje....</p>
  }
  return (
    <>
      <Navigation />
      <div className="all-ads-container">
        {/* Sidebar za filtere */}
        <div className="sidebar">
          <h3>Filteri</h3>

          {/* Filter po kategorijama */}
          <h4>Kategorije oglasa</h4>
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
                {category.naziv}
              </li>
            ))}
          </ul>

          {/* Filter po tipovima */}
          <h4>Tipovi</h4>
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
            {ads.length > 0 ? (
              ads.map((ad) => (
                <div
                  className="ad-card"
                  key={ad.id}
                  onClick={() => handleAdClick(ad.id)}
                  style={{ cursor: "pointer" }}
                >
                  <div
                    className={`ad-type ${ad.tip == "posao" ? "job" : "internship"}`}
                  >
                    {ad.tip || 'Ostalo'}
                  </div>
                  <h2 className="ad-title">{ad.naslov}</h2>
                  <p className="ad-company">{ad.firma}</p>
                  <p className="ad-location">{ad.lokacija}</p>
                  <button className="apply-button">Pogledaj oglas</button>
                </div>
              ))
            ) : (
              <p>Nema oglasa za prikaz.</p>
            )}
          </div>
        </div>

        {/* Pagination Controls */}
      
      </div>
      <div className="pagination">
          <button
            onClick={handlePrevPage}
            disabled={pagination.currentPage === 1}
            className="pagination-button"
          >
            Prethodna
          </button>
          <span className="pagination-info">
            Stranica {pagination.currentPage} od {pagination.totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={pagination.currentPage === pagination.totalPages}
            className="pagination-button"
          >
            Sledeća
          </button>
        </div>
    </>
  );
};

export default AllAds;
