import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "./Navigation";
import axios from "axios";
import "./CreatePost.css";

const CreatePost = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: "", content: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!post.title || !post.content) {
      setError("Naslov i sadržaj su obavezni.");
      return;
    }

    try {
      // Slanje POST zahteva sa Authorization headerom
      const response = await axios.post(
        "http://localhost:8000/api/postovi",
        {
          naslov: post.title,
          sadrzaj: post.content,
        },
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("auth_token"),
          },
        }
      );

     
        alert("Post je uspešno dodat!");
        navigate("/svi-postovi");
      
    } catch (error) {
      setError("Došlo je do greške pri dodavanju posta.");
    }
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
