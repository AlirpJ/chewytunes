import React from "react";
import "./FlavorPage.css";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import { useSpring, animated } from "react-spring";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

function FlavorPage(props) {
  return (
    <div class="flavorPage">
      <h1 class="flavor-header">Tell me about what you're eating...</h1>
      <body class="flavor-body">
        <div class="container">
          <div class="item itemA">
            <AwesomeButton type="primary">Crunchy</AwesomeButton>
          </div>
          <div class="item itemB">
            <p class="flavor-or">Or</p>
          </div>
          <div class="item itemC">
            <AwesomeButton type="primary" border-radius={25}>
              Chewy
            </AwesomeButton>
          </div>
          <div class="item itemA">
            <AwesomeButton type="primary">Spicy</AwesomeButton>
          </div>
          <div class="item itemB">
            <p class="flavor-or">Or</p>
          </div>
          <div class="item itemC">
            <AwesomeButton type="primary">Salty</AwesomeButton>
          </div>
          <div class="item itemA">
            <AwesomeButton type="primary">Bitter</AwesomeButton>
          </div>
          <div class="item itemB">
            <p class="flavor-or">Or</p>
          </div>
          <div class="item itemC">
            <AwesomeButton type="primary" button-default-border-radius={25}>
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
