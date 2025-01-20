import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Students.css";
import Navigation from "./Navigation";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  });
  const studentsPerPage = 5; // Broj studenata po stranici

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/users/studenti",
          {
            params: {
              page: pagination.currentPage,
              per_page: studentsPerPage,
            },
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("auth_token")}`,
            },
          }
        );

        // Postavi podatke o studentima i paginaciji
        setStudents(response.data.data);
        setPagination({
          currentPage: response.data.meta.current_page,
          totalPages: response.data.meta.last_page,
          totalItems: response.data.meta.total,
        });
      } catch (error) {
        console.error("Greška prilikom učitavanja studenata:", error);
      }
    };

    fetchStudents();
  }, [pagination.currentPage]);

  const handleDeleteStudent = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("auth_token")}`,
        },
      });

      alert('Uspesno obrisan student');
      
      setStudents((prevStudents) =>
        prevStudents.filter((student) => student.id !== id)
      );

     
      if (students.length === 1 && pagination.currentPage > 1) {
        setPagination((prev) => ({
          ...prev,
          currentPage: prev.currentPage - 1,
        }));
      }
    } catch (error) {
      console.error("Greška prilikom brisanja studenta:", error);
    }
  };

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

  return (
    <>
      <Navigation />
      <div className="students-page">
        <h1>Spisak studenata</h1>
        <table className="students-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Ime</th>
              <th>Prezime</th>
              <th>Email</th>
              <th>Fakultet</th>
              <th>Godina studija</th>
              <th>Akcije</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.details.ime}</td>
                  <td>{student.details.prezime}</td>
                  <td>{student.email}</td>
                  <td>{student.details.fakultet}</td>
                  <td>{student.details.godina_studija}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteStudent(student.id)}
                    >
                      Obriši
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">Nema dostupnih studenata.</td>
              </tr>
            )}
          </tbody>
        </table>

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
    </>
  );
};

export default Students;
