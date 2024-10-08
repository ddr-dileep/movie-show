import { Home } from "./pages/home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import React from "react";
import MovieDetails from "./pages/Movie-details/MovieDetails";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/movie/:movieId" element={<MovieDetails />} />
  </Routes>
);

export default AppRoutes;
