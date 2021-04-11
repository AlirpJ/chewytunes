import React from 'react'
import WaveStatus from './WaveStatus'

import './App.css';

import Wave from 'react-wavify';
import { AwesomeButton } from "react-awesome-button";
import { useSpring, animated } from 'react-spring'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';


function TopHalfAnimated({ onButtonPress }) {
  var props = useSpring({ opacity: 1, from: { opacity: 0 }, mass: 500 });
  return (
    <animated.div class="top-half-actions" style={props}>
      <h1 class="top"> Find me foods that go with my favorite tunes </h1>
      <AwesomeButton type="secondary" onPress={onButtonPress}>
        <FontAwesomeIcon icon={faChevronUp} size='2x' />
      </AwesomeButton>
    </animated.div>
  )
}

function BottomHalfAnimated({ onButtonPress }) {
  var props = useSpring({ opacity: 1, from: { opacity: 0 } });
  return (
    <animated.div class="bottom-half-actions" style={props}>
      <h1 class="bottom"> Find me tunes that will go with my current meal </h1>
      <AwesomeButton type="primary" onPress={onButtonPress}><FontAwesomeIcon icon={faChevronDown} size='2x' /></AwesomeButton>
    </animated.div>
  )
}

const determineTopHeight = (waveStatus) => {
  if (waveStatus === WaveStatus.NEUTRAL) {
    return '50vh';
  } else if (waveStatus === WaveStatus.WASH_UP) {
    return '0';
  } else if (waveStatus === WaveStatus.WASH_DOWN) {
    return '100vh';
  }
}

const determineBottomHeight = (waveStatus) => {
  if (waveStatus === WaveStatus.NEUTRAL) {
    return '50vh';
  } else if (waveStatus === WaveStatus.WASH_UP) {
    return '100vh';
  } else if (waveStatus === WaveStatus.WASH_DOWN) {
    return '0vh';
  }
}

export default function NeutralOption({waveStatus, setWaveStatus}) {
  const top_half_props = useSpring({ height: determineTopHeight(waveStatus) })
  const bottom_half_props = useSpring({ height: determineBottomHeight(waveStatus) })

  return (
    <div>
      <animated.div class="top-half" style={top_half_props}>
        <TopHalfAnimated onButtonPress={() => setWaveStatus(WaveStatus.WASH_UP)} />
      </animated.div>
      <div>
        <BottomHalfAnimated onButtonPress={() => setWaveStatus(WaveStatus.WASH_DOWN)}/>
        <animated.div class="bottom-half" style={bottom_half_props}>
          <Wave
            fill='#4C753F'
            class='wave'
            paused={false}
            options={{
              height: 10,
              amplitude: 20,
              speed: 0.25,
              points: 5
            }}
          />
        </animated.div>
      </div>
    </div>

  )
}