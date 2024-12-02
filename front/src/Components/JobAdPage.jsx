import React, { useState, useEffect } from "react";
import "./JobAdPage.css";
import Navigation from "./Navigation";

const JobAdPage = () => {
  const [role, setRole] = useState(null); // Skladištimo ulogu korisnika
  const [applications, setApplications] = useState([
    {
      id: 1,
      username: "student1",
      email: "student1@example.com",
      cv: "/path/to/cv1.pdf",
      status: "Na Čekanju",
    },
    {
      id: 2,
      username: "student2",
      email: "student2@example.com",
      cv: "/path/to/cv2.pdf",
      status: "Odbijen",
    },
    {
      id: 3,
      username: "student3",
      email: "student3@example.com",
      cv: "/path/to/cv3.pdf",
      status: "Pozvan na intervju",
    },
  ]);

  // Dohvaćanje uloge iz sessionStorage
  useEffect(() => {
    const storedRole = sessionStorage.getItem("role") || "student";
    if (storedRole) {
      setRole(storedRole);
    } else {
      alert("Uloga nije definisana! Molimo prijavite se ponovo.");
    }
  }, []);

  const handleDeleteJobAd = () => {
    alert("Oglas obrisan!");
  };

  const handleCloseJobAd = () => {
    alert("Oglas zatvoren!");
  };

  const handleChangeApplicationStatus = (id, newStatus) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, status: newStatus } : app
      )
    );
  };

  const handleApplyForJob = (e) => {
    e.preventDefault();
    alert("Prijava uspešno poslata!");
  };

  // Renderovanje
  return (
    <>
        <Navigation/>
        <div className="job-ad-page">
        {/* Baner oglasa */}
        <div className="job-banner">
            <img
            src="https://via.placeholder.com/1200x300"
            alt="Job Banner"
            className="banner-image"
            />
        </div>

        {/* Opis posla */}
        <div className="job-description">
            <h1>Naslov oglasa</h1>
            <p>Opis posla: Ovo je opis posla za određeni oglas.</p>
            <p>Potrebna znanja: React, Node.js, CSS, HTML</p>
            <p>Lokacija: Beograd</p>
        </div>

        {/* Dinamički sadržaj u zavisnosti od uloge */}
        {role === "admin" && (
            <div className="admin-section">
            <h2>Prijave za oglas</h2>
            <table className="applications-table">
                <thead>
                <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>CV</th>
                    <th>Status prijave</th>
                </tr>
                </thead>
                <tbody>
                {applications.map((app) => (
                    <tr key={app.id}>
                    <td>{app.username}</td>
                    <td>{app.email}</td>
                    <td>
                        <a href={app.cv} target="_blank" rel="noopener noreferrer">
                        Otvori CV
                        </a>
                    </td>
                    <td>{app.status}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button onClick={handleDeleteJobAd} className="delete-job-btn">
                Obriši oglas
            </button>
            </div>
        )}

        {role === "company" && (
            <div className="company-section">
            <h2>Prijave za oglas</h2>
            <table className="applications-table">
                <thead>
                <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>CV</th>
                    <th>Status prijave</th>
                    <th>Akcije</th>
                </tr>
                </thead>
                <tbody>
                {applications.map((app) => (
                    <tr key={app.id}>
                    <td>{app.username}</td>
                    <td>{app.email}</td>
                    <td>
                        <a href={app.cv} target="_blank" rel="noopener noreferrer">
                        Otvori CV
                        </a>
                    </td>
                    <td>{app.status}</td>
                    <td>
                        {app.status === "Na Čekanju" && (
                        <>
                            <button className="invite-btn"
                            onClick={() =>
                                handleChangeApplicationStatus(app.id, "interview")
                            }
                            >
                            Pozovi na intervju
                            </button>
                            <button className="reject-btn"
                            onClick={() =>
                                handleChangeApplicationStatus(app.id, "rejected")
                            }
                            >
                            Odbij
                            </button>
                        </>
                        )}
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button onClick={handleCloseJobAd} className="close-job-btn">
                Zatvori oglas
            </button>
            </div>
        )}

        {role === "student" && (
            <div className="student-section">
            <h2>Prijavi se za oglas</h2>
            <form onSubmit={handleApplyForJob}>
                <input type="file" accept="application/pdf" required />
                <button type="submit">Prijavi se</button>
            </form>
            </div>
        )}
        </div>
    </>
  );
};

export default JobAdPage;
