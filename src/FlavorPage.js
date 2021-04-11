import React from "react";
import "./FlavorPage.css";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import { useSpring, animated } from "react-spring";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

var dict = {
  Crunchy: false,
  Chewy: false,
  Spicy: false,
  Salty: false,
  Bitter: false,
  Sweet: false,
};

function UpdateDict(flavorSelected) {
  switch (flavorSelected) {
    case "crunchy":
      dict.Crunchy = !dict.Crunchy;
      if (dict.Chewy === true && dict.Crunchy === true) {
        dict.Chewy = false;
      }
      break;
    case "chewy":
      dict.Chewy = !dict.Chewy;
      if (dict.Chewy === true && dict.Crunchy === true) {
        dict.Crunchy = false;
      }
      break;
    case "spicy":
      dict.Spicy = !dict.Spicy;
      if (dict.Salty === true && dict.Spicy === true) {
        dict.Salty = false;
      }
      break;
    case "salty":
      dict.Salty = !dict.Salty;
      if (dict.Salty === true && dict.Spicy === true) {
        dict.Spicy = false;
      }
      break;
    case "bitter":
      dict.Bitter = !dict.Bitter;
      if (dict.Sweet === true && dict.Bitter === true) {
        dict.Sweet = false;
      }
      break;
    case "sweet":
      dict.Sweet = !dict.Sweet;
      if (dict.Sweet === true && dict.Bitter === true) {
        dict.Bitter = false;
      }
      break;
  }
}
function FlavorPage(props) {
  return (
    <div class="flavorPage">
      <h1 class="flavor-header">Tell me about what you're eating...</h1>
      <body class="flavor-body">
        <div class="container">
          <div class="item itemA">
            <AwesomeButton type="primary" onPress={() => UpdateDict("crunchy")}>
              Crunchy
            </AwesomeButton>
          </div>
          <div class="item itemB">
            <p class="flavor-or">Or</p>
          </div>
          <div class="item itemC">
            <AwesomeButton type="primary" onPress={() => UpdateDict("chewy")}>
              Chewy
            </AwesomeButton>
          </div>
          <div class="item itemA">
            <AwesomeButton type="primary" onPress={() => UpdateDict("spicy")}>
              Spicy
            </AwesomeButton>
          </div>
          <div class="item itemB">
            <p class="flavor-or">Or</p>
          </div>
          <div class="item itemC">
            <AwesomeButton type="primary" onPress={() => UpdateDict("salty")}>
              Salty
            </AwesomeButton>
          </div>
          <div class="item itemA">
            <AwesomeButton type="primary" onPress={() => UpdateDict("bitter")}>
              Bitter
            </AwesomeButton>
          </div>
          <div class="item itemB">
            <p class="flavor-or">Or</p>
          </div>
          <div class="item itemC">
            <AwesomeButton type="primary" onPress={() => UpdateDict("sweet")}>
              Sweet
            </AwesomeButton>
          </div>
          <div class="empty"></div>
          <div class="done">
            <AwesomeButton type="secondary">Done</AwesomeButton>
          </div>
        </div>
      </body>
    </div>
  );
}

export default FlavorPage;
