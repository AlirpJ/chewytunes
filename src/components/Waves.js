import React from "react";
import { PaperContainer, Circle, Layer, Path } from "@psychobolt/react-paperjs";

const Wave = (props) => (
  <div>
    <PaperContainer {...props}>
      <Path fillColor="blue" Path ></Path>
    </PaperContainer>
  </div>
);

export default Wave;
