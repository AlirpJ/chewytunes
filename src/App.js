import React, { Component } from 'react';
import Wave from 'react-wavify';
import './App.css';
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import "./my-button.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

class App extends Component {
  render() {
    return (
      <div class="background">
        <div class="top-half">
        <div class="top-half-actions">
          <h1 class="top"> Find me foods that go with my favorite tunes </h1>
          <AwesomeButton type="secondary"><FontAwesomeIcon icon={faChevronUp} size='2x'/></AwesomeButton>
        </div>
        </div>
        <div class="background">
          <div class="on-top">
            <h1 class="bottom"> Find me tunes that will go with my current meal </h1>
            <AwesomeButton type="primary"><FontAwesomeIcon icon={faChevronDown} size='2x'/></AwesomeButton>
          </div>
          <div class="bottom-half">
            <Wave fill='#4C753F'
              class='wave'
              paused={false}
              options={{
                height: 10,
                amplitude: 20,
                speed: 0.25,
                points: 5
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
