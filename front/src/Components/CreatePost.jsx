import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "./Navigation";
import "./CreatePost.css";

const CreatePost = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: "", author: "", content: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!post.title || !post.author || !post.content) {
      setError("Sva polja su obavezna.");
      return;
    }

    // Simulacija čuvanja posta
    alert("Post je uspešno dodat!");
    navigate("/all-posts"); // Preusmeravanje na stranicu sa svim postovima
  };

  return (
    <>
      <Navigation />
      <div className="create-post-container">
        <h1 className="page-title">Napiši Post</h1>
        <form className="post-form" onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
          <label htmlFor="title">Naslov:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={post.title}
            onChange={handleChange}
            placeholder="Unesite naslov posta"
          />

          

          <label htmlFor="content">Sadržaj:</label>
          <textarea
            id="content"
            name="content"
            value={post.content}
            onChange={handleChange}
            placeholder="Unesite sadržaj posta"
          ></textarea>

          <button type="submit" className="submit-post-button">
            Objavi Post
          </button>
        </form>
      </div>
    </>
  );
};

export default CreatePost;
