import React from "react";
import "./style.scss";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="not-found">
      <h1>404</h1>
      <div class="cloak__wrapper">
        <div class="cloak__container">
          <div class="cloak"></div>
        </div>
      </div>
      <div class="info">
        <h2>We can't find the page</h2>
        <p>
          You are shortly redirected to the Home page or click on Home below .{" "}
        </p>
        <Link to="/">Home</Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
