import React from 'react';
import { PaperContainer, Circle, Layer } from '@psychobolt/react-paperjs'
import Login from "./Login"
import Dashboard from "./Dashboard"
import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap/dist/css/bootstrap.css'

const Shapes = () => <Circle center={[120, 50]} radius={35} fillColor="#00FF00" />;

var access_token = new URLSearchParams(window.location.hash).get('#access_token');

function App() {
  return access_token ? <Dashboard access_token = {access_token} /> : <Login />
}

export default App;
