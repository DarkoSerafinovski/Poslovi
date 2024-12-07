import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navigation from "./Navigation";
import "./SinglePost.css";

const SinglePost = () => {
  const { id } = useParams(); // Dohvatanje ID-a posta iz URL-a
  const navigate = useNavigate();

  // Dohvatanje uloge korisnika iz sessionStorage
  const userRole = sessionStorage.getItem("userRole");

  // Simulacija podataka o postovima
  const samplePosts = [
    { id: 1, title: "Kako napisati dobar CV?", author: "Marko Petrović", date: "2024-12-05", content: "U ovom članku..." },
    { id: 2, title: "Saveti za uspešan intervju", author: "Jovana Nikolić", date: "2024-12-01", content: "Intervju za posao može biti stresan..." },
    { id: 3, title: "Kako se povezati sa kompanijama?", author: "Milan Jovanović", date: "2024-11-28", content: "Networking je ključan..." },
  ];

  const post = samplePosts.find((p) => p.id === parseInt(id));

  const handleDeletePost = () => {
    // Logika za brisanje posta (može uključivati API poziv)
    alert(`Post sa ID-jem ${id} je obrisan.`);
    navigate("/all-posts"); // Vraćanje na stranicu sa svim postovima
  };

  if (!post) {
    return <p>Post nije pronađen.</p>;
  }

  return (
    <>
      <Navigation />
      <div className="single-post-container">
        <h1 className="post-title">{post.title}</h1>
        <p className="post-author">Autor: {post.author}</p>
        <p className="post-date">Datum: {post.date}</p>
        <p className="post-content">{post.content}</p>
        {["alumni", "admin"].includes(userRole) && (
          <button className="delete-post-button" onClick={handleDeletePost}>
            Obriši Post
          </button>
        )}
      </div>
    </>
  );
};

export default SinglePost;
