import React, { useState } from "react";
import "./Students.css";
import Navigation from "./Navigation";

const Students = () => {
  const [students, setStudents] = useState([
    { id: 1, name: "Petar Petrović", email: "petar.petrovic@example.com" },
    { id: 2, name: "Ana Anić", email: "ana.anic@example.com" },
    { id: 3, name: "Marko Marković", email: "marko.markovic@example.com" },
  ]);

  const handleDeleteStudent = (id) => {
    const updatedStudents = students.filter((student) => student.id !== id);
    setStudents(updatedStudents);
  };

  return (
    <>
        <Navigation/>
        <div className="students-page">
        <h1>Spisak studenata</h1>
        <table className="students-table">
            <thead>
            <tr>
                <th>ID</th>
                <th>Ime i prezime</th>
                <th>Email</th>
                <th>Akcije</th>
            </tr>
            </thead>
            <tbody>
            {students.map((student) => (
                <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>
                    <button
                    className="delete-btn"
                    onClick={() => handleDeleteStudent(student.id)}
                    >
                    Obriši
                    </button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    </>
  );
};

export default Students;
