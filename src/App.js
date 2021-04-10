import React from "react";
import { PaperContainer, Circle, Layer, Path } from "@psychobolt/react-paperjs";
import paper from "paper";
import Wave from "./components/Waves.js";
import { renderWithPaperScope } from "@psychobolt/react-paperjs/dist/index.prod";
const Shapes = () => (
  <Circle center={[120, 50]} radius={35} fillColor="#00FF00" />
);

const App = (props) => (
  <div>
    <PaperContainer {...props}>
      <Layer>
        <Path
          fillColor="black"
          pathData="M100,50c0,27.614-22.386,50-50,50S0,77.614,0,50S22.386,0,50,0S100,22.386,100,50"
        ></Path>
      </Layer>
    </PaperContainer>
  </div>
);

export default App;
