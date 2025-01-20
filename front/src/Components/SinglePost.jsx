import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navigation from "./Navigation";
import "./SinglePost.css";

const SinglePost = () => {
  const { id } = useParams(); // Dohvatanje ID-a posta iz URL-a
  const navigate = useNavigate();
  const [post, setPost] = useState(null); // Za čuvanje podataka o postu

  // Dohvatanje uloge korisnika iz sessionStorage
  const userRole = sessionStorage.getItem("userRole");

  // Funkcija za dohvat posta sa servera
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/postovi/${id}`, {
          headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('auth_token'),
          }
        });
        setPost(response.data.data); // Spremamo post u stanje
      } catch (error) {
        console.error('Greška prilikom učitavanja posta:', error);
      }
    };

    fetchPost();
  }, [id]);

  // Funkcija za brisanje posta
  const handleDeletePost = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/postovi/${id}`, {
        headers: {
          'Authorization': 'Bearer ' + sessionStorage.getItem('auth_token'),
        }
      });
      alert(`Post sa ID-jem ${id} je uspešno obrisan.`);
      navigate("/svi-postovi"); // Vraćanje na stranicu sa svim postovima
    } catch (error) {
      console.error('Greška prilikom brisanja posta:', error);
      alert("Došlo je do greške pri brisanju posta.");
    }
  };

  

  return (
    <>
      <Navigation />
      {post&& (   <div className="single-post-container">
        <h1 className="post-title">{post.naslov}</h1>
        <p className="post-author">Autor: {post.autor}</p>
        <p className="post-date">Datum: {post.datum_i_vreme}</p>
        <p className="post-content">{post.sadrzaj}</p>
        {["alumni", "admin"].includes(userRole) && (
          <button className="delete-post-button" onClick={handleDeletePost}>
            Obriši Post
          </button>
        )}
      </div>)}
   
     
    </>
  );
};

export default SinglePost;
