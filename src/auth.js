import React from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";

export default function Auth() {
  var access_token = new URLSearchParams(window.location.hash).get(
    "#access_token"
  );
  localStorage.setItem("spotifyAccessToken", access_token);
  console.log("access token", access_token);

  return access_token ? <Dashboard access_token={access_token} /> : <Login />;
}
