import React, { useState, useEffect } from "react";
import "./Navigation.css";

const Navigation = () => {
  // Postavljanje trenutne uloge
  const [userRole, setUserRole] = useState("student"); // Default uloga

  useEffect(() => {
    // Provera uloge iz sessionStorage
    const storedRole = sessionStorage.getItem("userRole");
    if (storedRole) {
      setUserRole(storedRole);
    }
  }, []);

  // Funkcija za generisanje navigacije na osnovu uloge
  const renderNavigationLinks = () => {
    switch (userRole) {
      case "admin":
        return (
          <>
            <li><a href="/all-ads">Svi Oglasi</a></li>
            <li><a href="/kompanije">Kompanije</a></li>
            <li><a href="/categories">Kategorije</a></li>
            <li><a href="/students">Studenti</a></li>
          </>
        );
      case "company":
        return (
          <>
            <li><a href="/account">Naš Profil</a></li>
            <li><a href="/nasi-oglasi">Naši Oglasi</a></li>
            <li><a href="/dodaj-oglas">Dodaj Oglas</a></li>
          </>
        );
      case "student":
        return (
          <>
            <li><a href="/all-ads">Svi Oglasi</a></li>
            <li><a href="/moje-prijave">Moje Prijave</a></li>
            <li><a href="/kompanije">Kompanije</a></li>
          </>
        );
      default:
        return null; // U slučaju da nema definisane uloge
    }
  };

  // Funkcija za logout
  const handleLogout = () => {
    sessionStorage.removeItem("userRole"); // Briše ulogu iz sessionStorage
    window.location.href = "/"; // Vraća korisnika na početnu stranicu
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <h1 className="nav-logo">JobFinder</h1>
        <ul className="nav-links">
          {renderNavigationLinks()}
        </ul>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
