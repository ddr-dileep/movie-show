import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_API_URL } from "../../constants/config";
import { toast } from "react-toastify";

const MovieDetails = () => {
  const { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(`${BASE_API_URL}/movie/get-one/${movieId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.success) {
        // setMovies(data?.data?.movies);
        setIsLoading(false);
        toast.success(data.message);
      }
    };

    fetchMovies();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      movie details <p>Movie ID: {movieId}</p>
    </div>
  );
};

export default MovieDetails;
