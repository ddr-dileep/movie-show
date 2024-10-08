import React, { useEffect, useState } from "react";
import "./style.scss";
import { BASE_API_URL } from "../../constants/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";

export const Home = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(`${BASE_API_URL}/movie/get-all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.success) {
        setMovies(data?.data?.movies);
        setIsLoading(false);
        toast.success(data.message);
      }
    };

    fetchMovies();
  }, []);

  const handleClickMovie = async (movieId) => {
    toast.success(`Clicked on ${movieId}`);
    navigate(`/movie/${movieId}`);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="home_page">
      <h1>Home Page</h1>
      <div className="home_page-movies">
        <div className="home_page-movies-container">
          {movies?.map((movie) => (
            <div
              key={movie.id}
              className="home_page-movies-card"
              onClick={() => handleClickMovie(movie?._id)}
            >
              <img
                src={movie?.posterUrl}
                alt={movie.title}
                className="home_page-movies-card-image"
              />
              <div className="home_page-movies-card-footer">
                <h2>{movie.title}</h2>
                <p>{movie?.createdAt?.slice(0, 4)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
