import React, { useState, useEffect } from "react";
import "./JobAdPage.css";
import Navigation from "./Navigation";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const JobAdPage = () => {
  const [role, setRole] = useState(null);
  const [jobAd, setJobAd] = useState(null);
  const [applications, setApplications] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [privilege,setPrivilege]=useState(null);

  useEffect(() => {
    const storedRole = sessionStorage.getItem("role") || "alumni";
    if (storedRole) {
      setRole(storedRole);
    } else {
      alert("Uloga nije definisana! Molimo prijavite se ponovo.");
    }

    // Dohvati oglas
    axios
      .get(`http://localhost:8000/api/oglasi/${id}`, {
        headers: {
          'Authorization': 'Bearer ' + sessionStorage.getItem('auth_token'),
        },
      })
      .then((response) => {
        setJobAd(response.data.data);
        setApplications(response.data.data.prijave);
        setPrivilege(response.data.role);
      })
      .catch((error) => {
        console.error("Greška pri učitavanju oglasa", error);
      });
  }, [id]);

  const handleDeleteJobAd = () => {
    axios
      .delete(`http://localhost:8000/api/oglasi/${id}`, {
        headers: {
          'Authorization': 'Bearer ' + sessionStorage.getItem('auth_token'),
        },
      })
      .then(() => {
        alert("Oglas je uspešno obrisan!");
        navigate("/oglasi");
      })
      .catch((error) => {
        alert("Greška pri brisanju oglasa.");
        console.error(error);
      });
  };

  const handleChangeApplicationStatus = (id, newStatus) => {
    axios
      .put(
        `http://localhost:8000/api/prijave/${id}`,
        { status: newStatus },
        {
          headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('auth_token'),
          },
        }
      )
      .then(() => {
        setApplications((prev) =>
          prev.map((app) =>
            app.id === id ? { ...app, status: newStatus } : app
          )
        );
      })
      .catch((error) => {
        alert("Greška pri izmeni statusa prijave.");
        console.error(error);
      });
  };

  const handleApplyForJob = (e) => {
    e.preventDefault();
    const file = e.target.fajl.files[0];
    if (!file) {
      alert("Molimo odaberite PDF fajl.");
      return;
    }

    const formData = new FormData();
    formData.append('oglas_id', id);
    formData.append('fajl', file);

    axios
      .post("http://localhost:8000/api/prijave", formData, {
        headers: {
          'Authorization': 'Bearer ' + sessionStorage.getItem('auth_token'),
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        alert("Prijava uspešno poslata!");
        navigate('/moje-prijave');
      })
      .catch((error) => {
        alert("Greška pri slanju prijave.");
        console.error(error);
      });
  };

  const getRowClass = (status) => {
    switch (status) {
      case 'prihvaceno':
        return 'accepted';
      case 'na cekanju':
        return 'pending';
      case 'odbijeno':
        return 'rejected';
      default:
        return '';
    }
  };

  return (
    <>
      <Navigation />
      <div className="job-ad-page">
        {jobAd && (
          <>
            {/* Baner oglasa */}
            <div className="job-banner">
              <img
                src={jobAd.banner}
                alt="Job Banner"
                className="banner-image"
              />
            </div>

            {/* Opis posla */}
            <div className="job-description">
              <h1>{jobAd.naslov}</h1>
              <p>{jobAd.opis}</p>
              <h3>Pozicija: {jobAd.kategorija.naziv}</h3>
              <p>Potrebna znanja: {jobAd.potrebna_znanja}</p>
              <p>Lokacija: {jobAd.lokacija}</p>
            </div>

            {/* Admin sekcija */}
            {privilege === "company" && (
              <div className="admin-section">
                <h2>Prijave za oglas</h2>
                <table className="applications-table">
                  <thead>
                    <tr>
                      <th>Ime</th>
                      <th>Email</th>
                      <th>CV</th>
                      <th>Status prijave</th>
                      <th>Akcije</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((app) => (
                      <tr
                        key={app.id}
                        className={getRowClass(app.status)}
                      >
                        <td>{app.ime} {app.prezime}</td>
                        <td>{app.email}</td>
                        <td>
                          <a href={app.fajl} target="_blank" rel="noopener noreferrer">
                            Otvori CV
                          </a>
                        </td>
                        <td>{app.status}</td>
                        <td>
                          {app.status === "na cekanju" && (
                            <>
                              <button
                                className="invite"
                                onClick={() =>
                                  handleChangeApplicationStatus(app.id, "prihvaceno")
                                }
                              >
                                Prihvati
                              </button>
                              <button
                                className="reject-btn"
                                onClick={() =>
                                  handleChangeApplicationStatus(app.id, "odbijeno")
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
                {(privilege==='company' || privilege==='admin') && ( 
                   <button onClick={handleDeleteJobAd} className="delete-job-btn">
                  Obriši oglas
                </button>)}
              
              </div>
            )}

            {/* Sekcija za prijavu (student) */}
            {role === "student" && (
              <div className="student-section">
                <h2>Prijavi se za oglas</h2>
                <form onSubmit={handleApplyForJob}>
                  <input
                    type="file"
                    name="fajl"
                    accept="application/pdf"
                    required
                  />
                  <button type="submit">Prijavi se</button>
                </form>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default JobAdPage;
