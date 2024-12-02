import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "./Navigation";
import "./AddAd.css";

const AddAd = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("");
  const [category, setCategory] = useState("Posao"); // Default kategorija
  const [jobCategory, setJobCategory] = useState("Front-end"); // Default kategorija posla
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simuliramo dodavanje oglasa (ovde bi se pozvao API za slanje podataka)
    console.log("Novi oglas je dodat:");
    console.log({ title, description, skills, category, jobCategory, image });

    // Nakon slanja, navigiramo korisnika na stranicu sa svim oglasima
    navigate("/all-ads");
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
            <label htmlFor="category">Kategorija:</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="Posao">Posao</option>
              <option value="Praksa">Praksa</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="job-category">Kategorija Posla:</label>
            <select
              id="job-category"
              value={jobCategory}
              onChange={(e) => setJobCategory(e.target.value)}
              required
            >
              <option value="Front-end">Front-end</option>
              <option value="Back-end">Back-end</option>
              <option value="Full-stack">Full-stack</option>
              <option value="DevOps">DevOps</option>
              <option value="Mobile Development">Mobile Development</option>
              <option value="Data Science">Data Science</option>
              <option value="QA Engineer">QA Engineer</option>
              <option value="UI/UX Designer">UI/UX Designer</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="image">Slika:</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
            />
            {image && <img src={image} alt="Preview" className="image-preview" />}
          </div>
          <button type="submit" className="submit-button">Dodaj Oglas</button>
        </form>
      </div>
    </>
  );
};

export default AddAd;
