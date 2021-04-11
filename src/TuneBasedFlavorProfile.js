import React, { useEffect, useState } from "react";
import "./TuneBasedFlavorProfile.css";
import SamplePhoto from "./logo192.png";
import { mapStatsToFlavors, getUserTopSongs, getRandom } from "./JSonParse"
const SpotifyWebApi = require('spotify-web-api-node')

function TuneBasedFlavorProfile(props) {
  const [flavorStats, setFlavorStats] = useState([])
  const [top10, setTop10] = useState([])

  const token = localStorage.getItem('spotifyAccessToken');
  console.log('TuneBased', token);

  const spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(token);

  useEffect(() => {
    async function fetchMyAPI() {
      const flavorStats = await mapStatsToFlavors(spotifyApi);
      setFlavorStats(flavorStats);

      const top10 = await getUserTopSongs(spotifyApi);
      setTop10(top10);
    }
    try {
      fetchMyAPI()
    } catch (e) {
      console.error(e);
    }

  }, [])
  
  return (
    <div class="TunesBackground">
      <h1 class="tunestop">Here are your food recommendations!</h1>
      <p>{flavorStats[0]}</p>
      <p class="bootlicker">How about trying Panera's Classic, Broccoli Cheddar Mac & Cheese!</p>
      <p>(Here are the tracks we based your food selection on, in case you were curious):</p>
      <div class="container">
        {top10.map((value, index) => {
          return (
            <div class="unit">
              <img src={value[0]}></img>
              <p key={index}>{value[1] + " - " + value[2]}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TuneBasedFlavorProfile;
