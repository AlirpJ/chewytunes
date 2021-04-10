import React, { Component } from 'react';
import paper from 'paper';

class App extends Component {

  componentDidMount() {
    paper.setup('canvas');

    const scriptToLoad = 'a';

    switch (scriptToLoad) {
      case 'a':
        require('./wave.js');
        break;
      case 'b':
        require('./b.js');
        break;
      default:
        break;

    }
  }

  render() {
    return (
      <div>
        <canvas id="canvas"></canvas>
      </div>
    );
  }
}

export default App;
