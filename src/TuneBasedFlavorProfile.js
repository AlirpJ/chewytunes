import React, { useEffect, useState } from "react";
import "./TuneBasedFlavorProfile.css";
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
      <h1 style={{color: "#ffd68f"}} class="tunestop">Here are your food recommendations!</h1>
      <p style={{color: "#ffd68f"}}>{flavorStats[0]}</p>
      <p style={{color: "#ffd68f"}} class="bootlicker">How about trying Panera's Classic, Broccoli Cheddar Mac & Cheese!</p>
      <p>(Here are the tracks we based your food selection on, in case you were curious):</p>
      <div class="grid">
        {top10.map((value, index) => {
          return (
            <div class="unit">
              <a href={value[3]}>
                <img src={value[0]}></img> 
              </a>
              <p class="title" style={{color: "#ffd68f"}} key={index}>{value[1]}</p>
              <p class="artist" style={{color: "#ffd68f"}}> {value[2]}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TuneBasedFlavorProfile;
