import React from "react";
import "./App.css";
import TunesPage from "./TunesPage.js";
import Auth from "./Auth";
import FlavorPage from "./FlavorPage";

export default function UpOption() {
  return (
    <div>
      <FlavorPage></FlavorPage>
      <Auth />
    </div>
  );
}
