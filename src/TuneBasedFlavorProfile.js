import React, { useEffect, useState } from "react";
import "./FlavorBasedTuneCurration.css";
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
      <h1 class="tunestop">Here are your delicious tunes</h1>
      <p>{flavorStats[0]}</p>
      <p> How about trying Panera's Clasic, Broccoli Cheddar Mac & Cheese! </p>
      <ul>
        {top10.map((value, index) => {
          return <li key={index}>{value}</li>
        })}
      </ul>
    </div>
  );
}

export default TuneBasedFlavorProfile;
