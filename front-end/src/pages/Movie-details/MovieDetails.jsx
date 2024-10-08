import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_API_URL } from "../../constants/config";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";

const MovieDetails = () => {
  const { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await fetch(`${BASE_API_URL}/movie/get-one/${movieId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.success) {
        setMovie(data?.data?.movies);
        setIsLoading(false);
        toast.success(data.message);
      }
    };

    fetchMovie();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      movie details <p>Movie ID: {movieId}</p>
    </div>
  );
};

export default MovieDetails;
