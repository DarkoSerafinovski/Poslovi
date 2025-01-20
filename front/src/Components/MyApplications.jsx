import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import axios from "axios";
import "./MyApplications.css";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [status, setStatus] = useState("sve"); // Dodato stanje za status filter
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  });

  const applicationsPerPage = 5;

  const fetchApplications = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/users/moje-prijave", {
        params: {
          page: pagination.currentPage,
          per_page: applicationsPerPage,
          status: status === "sve" ? null : status, // Dodaj status u zahtev
        },
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("auth_token"),
        },
      });

      setApplications(response.data.data);
      setPagination({
        currentPage: response.data.meta.current_page,
        totalPages: response.data.meta.last_page,
        totalItems: response.data.meta.total,
      });
    } catch (error) {
      console.error("Greška prilikom učitavanja prijava:", error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [pagination.currentPage, status]); // Dodato da se osveži kada se promeni status

  const handleNextPage = () => {
    if (pagination.currentPage < pagination.totalPages) {
      setPagination((prev) => ({
        ...prev,
        currentPage: prev.currentPage + 1,
      }));
    }
  };

  const handlePrevPage = () => {
    if (pagination.currentPage > 1) {
      setPagination((prev) => ({
        ...prev,
        currentPage: prev.currentPage - 1,
      }));
    }
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
    setPagination((prev) => ({
      ...prev,
      currentPage: 1, // Resetuj paginaciju kada se promeni filter
    }));
  };

  const getCardClass = (status) => {
    switch (status) {
      case "odbijeno":
        return "application-card rejected";
      case "na cekanju":
        return "application-card pending";
      case "prihvaceno":
        return "application-card accepted";
      default:
        return "application-card";
    }
  };

  return (
    <>
      <Navigation />
      <div className="my-applications-container">
        <h1 className="page-title">Moje Prijave</h1>

        {/* Combobox za status filter */}
        <div className="filter-container">
          <label htmlFor="status-filter">Filtriraj po statusu:</label>
          <select id="status-filter" value={status} onChange={handleStatusChange}>
            <option value="sve">Sve</option>
            <option value="na cekanju">Na čekanju</option>
            <option value="odbijeno">Odbijeno</option>
            <option value="prihvaceno">Prihvaćeno</option>
          </select>
        </div>

        {applications.length === 0 ? (
          <p className="no-applications">Nemate podnetih prijava.</p>
        ) : (
          <div className="applications-list">
            {applications.map((application) => (
              <div className={getCardClass(application.status)} key={application.id}>
                <h2 className="application-title">{application.pozicija?.naziv || "Ostalo"}</h2>
                <p className="application-company">Firma: {application.firma}</p>
                <p className="application-status">Status: {application.status}</p>
                <p className="application-date">
                  Datum prijave: {new Date(application.datum_i_vreme).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}

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
    </>
  );
};

export default MyApplications;
