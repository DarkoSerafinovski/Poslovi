import React, { useState, useEffect } from "react";
import axios from "axios";
import "./JobCategories.css";
import Navigation from "./Navigation";

const JobCategories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(false);

  // Učitavanje kategorija sa servera
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8000/api/kategorije", {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("auth_token")}`,
          },
        });
        setCategories(response.data.data); // Pretpostavlja se da `data` sadrži polje `data` sa kategorijama
      } catch (error) {
        console.error("Greška pri učitavanju kategorija:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Dodavanje nove kategorije
  const handleAddCategory = async () => {
    if (newCategory.trim()) {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/kategorije",
          { naziv: newCategory },
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("auth_token")}`,
            },
          }
        );

        // Dodaj novu kategoriju u state
        alert('Dodata kategorija');
        setCategories([...categories, response.data.data]);
        setNewCategory("");
      } catch (error) {
        console.error("Greška pri dodavanju kategorije:", error);
        alert(
          error.response?.data?.message || "Došlo je do greške pri dodavanju!"
        );
      }
    } else {
      alert("Naziv kategorije ne može biti prazan!");
    }
  };

  // Brisanje kategorije
  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/kategorije/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("auth_token")}`,
        },
      });

      // Ažuriraj kategorije na frontendu
      const updatedCategories = categories.filter(
        (category) => category.id !== id
      );
      setCategories(updatedCategories);
      alert('Uspesno obrisano');
    } catch (error) {
      console.error("Greška pri brisanju kategorije:", error);
      alert(
        error.response?.data?.message || "Došlo je do greške pri brisanju!"
      );
    }
  };

  return (
    <>
      <Navigation />
      <div className="categories-page">
        <h1>Kategorije poslova i praksi</h1>

        {loading ? (
          <p>Učitavanje kategorija...</p>
        ) : (
          <div className="categories-list">
            {categories.map((category) => (
              <div key={category.id} className="category-item">
                <span>{category.naziv}</span>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteCategory(category.id)}
                >
                  Obriši
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="add-category">
          <input
            type="text"
            placeholder="Nova kategorija"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <button onClick={handleAddCategory}>Dodaj</button>
        </div>
      </div>
    </>
  );
};

export default JobCategories;
