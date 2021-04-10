import React from 'react';
import { PaperContainer, Circle, Layer } from '@psychobolt/react-paperjs'

import Login from "./Login"
import Dashboard from "./Dashboard"
import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap/dist/css/bootstrap.css'

const Shapes = () => <Circle center={[120, 50]} radius={35} fillColor="#00FF00" />;

const code = new URLSearchParams(window.location.search).get('code')

// const App = (props) => (
//   <div>
//     <Login />
//     <PaperContainer {...props}>
//       <Circle center={[80, 50]} radius={35} fillColor="red" />

//       <Layer>
//         <Shapes />
//       </Layer>
      
//     </PaperContainer>
//   </div>
// );

function App() {
  return code ? <Dashboard code = {code} /> : <Login />
}

export default App;
