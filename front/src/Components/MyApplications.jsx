import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import "./MyApplications.css";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    // Simulacija učitavanja prijava za studenta
    const fetchApplications = async () => {
      const sampleApplications = [
        { id: 1, title: "Junior React Developer", company: "TechCorp", status: "Na čekanju" },
        { id: 2, title: "Senior Backend Developer", company: "DevHouse", status: "Prihvaćeno" },
        { id: 3, title: "UI/UX Designer Intern", company: "Creative Studio", status: "Odbijeno" },
      ];
      setApplications(sampleApplications);
    };

    fetchApplications();
  }, []);

  return (
    <>
      <Navigation />
      <div className="my-applications-container">
        <h1 className="page-title">Moje Prijave</h1>
        {applications.length === 0 ? (
          <p className="no-applications">Nemate podnetih prijava.</p>
        ) : (
          <div className="applications-list">
            {applications.map((application) => (
              <div className="application-card" key={application.id}>
                <h2 className="application-title">{application.title}</h2>
                <p className="application-company">Firma: {application.company}</p>
                <p className="application-status">Status: {application.status}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MyApplications;
