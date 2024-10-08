import React, { useEffect } from "react";
import "./style.scss";
import { BASE_API_URL } from "../../constants/config";

export const Home = () => {
  const [movies, setMovies] = React.useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(`${BASE_API_URL}/movie/get-all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setMovies(data);
    };

    fetchMovies();
  }, []);

  console.log("movies", movies);

  return (
    <div className="home-page">
      <h1>Home Page</h1>
      <p>Welcome to our website!</p>
      <img src="https://example.com/image.jpg" alt="Example Image" />
      <button onClick={() => {}}>Click Me</button>
    </div>
  );
};
