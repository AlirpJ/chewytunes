import React from "react";
import "./FlavorBasedTuneCurration.css";
import SamplePhoto from "./logo192.png";
const SpotifyWebApi = require('spotify-web-api-node')

function FlavorBasedTuneCurration(props) {
  const token = localStorage.getItem('spotifyAccessToken');

  const spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(token);



  return (
    <div class="TunesBackground">
      <h1 class="tunestop">Here are your delicious tunes</h1>
      <div class="tunesbody">

        <div class="container">
          <div class="item item-1">
            <img
              class="songcover-item"
              src={SamplePhoto}
              alt="sample"
              width="100"
              height="100"
            ></img>
          </div>
          <div>
            <h1 class="songTitle">Look Ma I made it</h1>
            <h2 class="artist">By: Christian Razo</h2>
          </div>
          <div class="details">
            <p>
              This will be some blank filler text until I think of something
              cool or witty to put in here oh well haha isn't it funny that
              flamingos exist Idk why it's so funny to me
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlavorBasedTuneCurration;
