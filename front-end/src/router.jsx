import { Home } from "./pages/home/Home";
import { Routes, Route } from "react-router-dom";

import React from "react";
import MovieDetails from "./pages/Movie-details/MovieDetails";
import NotFoundPage from "./pages/not-found-page/NotFoundPage";

const AppRoutes = () => (
  <Routes>
    <Route path="/" index element={<Home />} />
    <Route path="/movie/:movieId" element={<MovieDetails />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default AppRoutes;
