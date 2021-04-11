import React from "react";
import "./App.css";
import TuneBasedFlavorProfile from "./TuneBasedFlavorProfile";
import Login from "./Login"

export default function UpOption() {
  var access_token = new URLSearchParams(window.location.hash).get("#access_token");
  localStorage.setItem("spotifyAccessToken", access_token);
  console.log("access token set in upoptions", access_token);

  if (access_token) {
    return <TuneBasedFlavorProfile/>
  } else {
    return <Login/>
  }

}
