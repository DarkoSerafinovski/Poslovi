import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CompaniesPage.css";
import Navigation from "./Navigation";
import axios from "axios";

const CompaniesPage = () => {
  const [companies, setCompanies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  });

  const companiesPerPage = 6; // Adjust the number of companies per page
  const navigate = useNavigate();

  // Učitavanje kategorija prilikom učitavanja stranice
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/kompanije/kategorije',{
          headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('auth_token'),
          }
        });
        setCategories(response.data.data); // Spremi kategorije u stanje
      
      } catch (error) {
        console.error('Greška prilikom učitavanja kategorija:', error);
      }
    };
    fetchCategories();
  }, []);

  // Učitavanje kompanija prilikom učitavanja stranice i promene kategorije
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/kompanije', {
          params: {
            page: pagination.currentPage,
            per_page: companiesPerPage,
            kategorija: selectedCategory ? { id: selectedCategory.id } : undefined, // Filter po kategoriji
          },
          headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('auth_token'),
          }
        });

        setCompanies(response.data.data); // Spremi kompanije u stanje
        setPagination({
          currentPage: response.data.meta.current_page,
          totalPages: response.data.meta.last_page,
          totalItems: response.data.meta.total,
        });
      } catch (error) {
        console.error('Greška prilikom učitavanja kompanija:', error);
      }
    };
    fetchCompanies();
  }, [pagination.currentPage, selectedCategory]); // Učitavanje kada se stranica ili kategorija promene

  // Paginacija
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

  const handleCardClick = (companyId) => {
    navigate(`/kompanije/${companyId}`);
  };

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
                {category.naziv}
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
            {companies.length > 0 ? (
              companies.map((company) => (
                <div
                  key={company.id}
                  className="company-card"
                  onClick={() => handleCardClick(company.id)}
                >
                  <div className="company-image">
                    <img src={company.logo} alt={company.naziv} />
                  </div>
                  <div className="company-info">
                    <h2 className="company-name">{company.naziv}</h2>
                    <p className="company-description">{company.opis}</p>
                    <p className="company-category">{company.kategorija.naziv}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>Nema kompanija za prikaz.</p>
            )}
          </div>

          {/* Pagination Controls */}
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
        </div>
      </div>
    </>
  );
};

export default CompaniesPage;
