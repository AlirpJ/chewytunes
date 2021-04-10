import React from "react";
import { PaperContainer, Circle, Layer } from "@psychobolt/react-paperjs";

const Shapes = () => (
  <Circle center={[120, 50]} radius={35} fillColor="#00FF00" />
);

const App = (props) => (
  <div>
    <PaperContainer {...props}>
      <Circle center={[80, 75]} radius={125} fillColor="red" />
      <Layer>
        <Shapes />
      </Layer>
    </PaperContainer>
  </div>
);

export default App;
