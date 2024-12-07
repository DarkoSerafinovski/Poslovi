import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Dodajemo useNavigate
import Navigation from "./Navigation";
import "./AllPosts.css";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate(); // Inicijalizujemo useNavigate

  useEffect(() => {
    const fetchPosts = async () => {
      const samplePosts = [
        {
          id: 1,
          title: "Kako sam pronašao posao u IT sektoru",
          author: "Marko Petrovic",
          content: "Ovo je kratak uvod u moj put ka prvom poslu u IT sektoru...",
          date: "2024-12-01",
        },
        {
          id: 2,
          title: "Saveti za uspešan intervju",
          author: "Ana Jovanovic",
          content: "U ovom postu podeliću kratke savete o pripremi za intervju...",
          date: "2024-11-28",
        },
        {
          id: 3,
          title: "Moj put od studenta do senior developera",
          author: "Nikola Mitrovic",
          content: "Ovo je sažetak mog profesionalnog razvoja od juniora do seniora...",
          date: "2024-11-15",
        },
      ];

      setPosts(samplePosts);
    };

    fetchPosts();
  }, []);

  const handleReadMore = (postId) => {
    navigate(`/svi-postovi/${postId}`); // Navigacija na stranicu određenog posta
  };

  return (
    <>
      <Navigation />
      <div className="all-posts-container">
        <h1 className="page-title">Svi Postovi</h1>
        <div className="posts-list">
          {posts.map((post) => (
            <div className="post-card" key={post.id}>
              <h2 className="post-title">{post.title}</h2>
              <p className="post-author">Autor: {post.author}</p>
              <p className="post-date">Datum: {post.date}</p>
              <p className="post-content">{post.content}</p>
              <button
                className="read-more-button"
                onClick={() => handleReadMore(post.id)} // Dodajemo onClick za navigaciju
              >
                Pročitaj više
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllPosts;
