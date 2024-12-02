import React, { useState } from "react";
import "./JobCategories.css";
import Navigation from "./Navigation";

const JobCategories = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "Razvoj softvera" },
    { id: 2, name: "Dizajn" },
    { id: 3, name: "Marketing" },
  ]);
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      setCategories([
        ...categories,
        { id: categories.length + 1, name: newCategory },
      ]);
      setNewCategory("");
    } else {
      alert("Naziv kategorije ne može biti prazan!");
    }
  };

  const handleDeleteCategory = (id) => {
    const updatedCategories = categories.filter((category) => category.id !== id);
    setCategories(updatedCategories);
  };

  return (
    <>
        <Navigation/>
        <div className="categories-page">
        <h1>Kategorije poslova i praksi</h1>
        <div className="categories-list">
            {categories.map((category) => (
            <div key={category.id} className="category-item">
                <span>{category.name}</span>
                <button
                className="delete-btn"
                onClick={() => handleDeleteCategory(category.id)}
                >
                Obriši
                </button>
            </div>
            ))}
        </div>
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
