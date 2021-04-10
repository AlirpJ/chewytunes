import React, { Component } from 'react';
import Wave from 'react-wavify';
import './App.css';


class App extends Component {

  render() {
    return (
      <div >
      <Wave style={{transform: [{ rotate: '90deg' }]}}
        fill='#f79902'
        paused={false}
        options={{
          height: 20,
          amplitude: 20,
          speed: 0.25,
          points: 5
        }}
  />
      </div>
    );
  }
}

export default App;
