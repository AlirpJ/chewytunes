import React, { Component, useState } from 'react';
import Wave from 'react-wavify';
import './App.css';
import useMeasure from './useMeasure'
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import "./my-button.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

import { useSpring, animated } from 'react-spring'

var fly_up = false;
var fly_down = false;

function WaveWash() {
  const top_half_props = useSpring({
    from: { height: '100vh', top: '0', bottom: '0' },
    to: async next => {
      while (1) {
        await next({ height: '100vh' })
        await next({ height: '0vh' })
        await next({ height: '50vh' })
        // await next({ height: '50vh' })
        // await next({ height: '100vh' })
        // await next({ height: '50vh' })
        // await next({ height: '0vh' })
      }
    },
  })

  const bottom_half_props = useSpring({
    from: { height: '0vh', top: '0', bottom: '0' },
    to: async next => {
      while (1) {
        await next({ height: '0vh' })
        await next({ height: '100vh' })
        await next({ height: '50vh' })
        // await next({ height: '50vh' })
        // await next({ height: '0vh' })
        // await next({ height: '50vh' })
        // await next({ height: '100vh' })
      }
    },
  })

  return (
    <div class="background">
      <animated.div class="top-half" style={top_half_props}>
        <TopHalfAnimated />
      </animated.div>
      <animated.div class="background">
        <BottomHalfAnimated />
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
      </animated.div>
    </div>
  )
}

function TopHalfAnimated() {
  var props = useSpring({ opacity: 1, from: { opacity: 0 }, mass: 500 });
  return (
    <animated.div class="top-half-actions" style={props}>
      <h1 class="top"> Find me foods that go with my favorite tunes </h1>
      <AwesomeButton type="secondary" onPress={() => { fly_down = true; }}><FontAwesomeIcon icon={faChevronUp} size='2x' /></AwesomeButton>
    </animated.div>
  )
}

function BottomHalfAnimated() {
  var props = useSpring({ opacity: 1, from: { opacity: 0 } });
  return (
    <animated.div class="bottom-half-actions" style={props}>
      <h1 class="bottom"> Find me tunes that will go with my current meal </h1>
      <AwesomeButton type="primary" onPress={() => WaveWash()}><FontAwesomeIcon icon={faChevronDown} size='2x' /></AwesomeButton>
    </animated.div>
  )
}

class App extends Component {
  render() {
    return (
      <WaveWash/>
    );
  }
}

export default App;
