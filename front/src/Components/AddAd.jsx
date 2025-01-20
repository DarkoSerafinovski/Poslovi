import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navigation from "./Navigation";
import "./AddAd.css";

const AddAd = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState(""); // Kategorija biće učitana
  const [categories, setCategories] = useState([]); // Za držanje kategorija
  const [image, setImage] = useState(null);
  const [adType, setAdType] = useState("posao"); // Default tip
  const navigate = useNavigate();

  // Učitavanje kategorija oglasa
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/kategorije',{
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("auth_token"),
          },
        });
        setCategories(response.data.data); // Čuvanje kategorija u state
        if (response.data.length > 0) {
          setCategory(response.data[0].id); // Postavljamo prvu kategoriju kao default
        }
      } catch (error) {
        console.error("Greška pri učitavanju kategorija", error);
      }
    };

    fetchCategories();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('naslov', title);
    formData.append('opis', description);
    formData.append('potrebna_znanja', skills);
    formData.append('kategorija_id', category);
    formData.append('lokacija', location); // Možeš dodati polje za lokaciju
    formData.append('tip', adType);
    formData.append('banner', image);

    try {
      await axios.post('http://localhost:8000/api/oglasi', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Za slanje fajlova,
          'Authorization': "Bearer " + sessionStorage.getItem("auth_token"),
        },
      });

     
      navigate('/nasi-oglasi');
    } catch (error) {
      console.error("Greška pri dodavanju oglasa", error);
    }
  };

  return (
    <>
      <Navigation />
      <div className="add-ad-container">
        <h1 className="page-title">Dodaj Oglas</h1>
        <form onSubmit={handleSubmit} className="ad-form">
          <div className="form-group">
            <label htmlFor="title">Naslov:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Opis:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="skills">Potrebna Znanja:</label>
            <input
              type="text"
              id="skills"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Lokacija:</label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Kategorija:</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.naziv}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="ad-type">Tip Oglasa:</label>
            <select
              id="ad-type"
              value={adType}
              onChange={(e) => setAdType(e.target.value)}
              required
            >
              <option value="posao">Posao</option>
              <option value="praksa">Praksa</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="image">Slika:</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </div>
          <button type="submit" className="submit-button">Dodaj Oglas</button>
        </form>
      </div>
    </>
  );
};

export default AddAd;
