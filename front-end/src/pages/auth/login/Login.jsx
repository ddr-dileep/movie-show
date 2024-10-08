import React from "react";

export const Login = () => {
  return (
    <div>
      <h1>Login</h1>
      <form>
        <label>
          Username:
          <input type="text" name="username" />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" />
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
      <a href="/register">Register</a>
      <br />
      <a href="/forgot-password">Forgot Password?</a>
      <br />
      <a href="/reset-password">Reset Password</a>
      <br />
      <a href="/">Home</a>
      <br />
      <a href="/logout">Logout</a>
      <br />
      <a href="/profile">Profile</a>
      <br />
      <a href="/dashboard">Dashboard</a>
      <br />
      <a href="/admin">Admin Dashboard</a>
    </div>
  );
};
