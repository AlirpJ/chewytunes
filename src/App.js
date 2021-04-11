import React, { Component, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";

import "./App.css";
import "react-awesome-button/dist/styles.css";
import "./my-button.css";

import { useTransition } from "@react-spring/core";
import { animated } from "@react-spring/web";

import WaveStatus from "./WaveStatus";

import UpOption from "./UpOption";
import BottomOption from "./BottomOption";
import NeutralOption from "./NeutralOption";

function WaveWash() {
  const [waveStatus, setWaveStatus] = useState(WaveStatus.NEUTRAL); //First item is the state, Second item is an updater for the state

  const transitions = useTransition(waveStatus, {
    from: { opacity: 1, background: "#FFD68F" },
    leave: { opacity: 0, delay: 500, background: "#4C753F" },
  });

  console.log(transitions);
  return (
    <div
      className={
        waveStatus === WaveStatus.WASH_UP ? "background-green" : "background"
      }
    >
      {transitions((props, item, key) => {
        return (
          <animated.div key={key} style={props}>
            {item === WaveStatus.WASH_UP && (
              <div class="top-option">
                <UpOption />
              </div>
            )}
            {item === WaveStatus.WASH_DOWN && (
              <div class="bottom-option">
                <BottomOption />
              </div>
            )}
            {item === WaveStatus.NEUTRAL && (
              <NeutralOption
                waveStatus={waveStatus}
                setWaveStatus={setWaveStatus}
              />
            )}
          </animated.div>
        );
      })}
    </div>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <WaveWash />;
  }
}

export default App;
