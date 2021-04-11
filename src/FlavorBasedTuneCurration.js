import React, { useEffect, useState } from "react";
import "./FlavorBasedTuneCurration.css";
import { getRecommendation } from "./JSonParse"
import SamplePhoto from "./logo192.png";
const SpotifyWebApi = require('spotify-web-api-node')

function FlavorBasedTuneCurration(props) {
  const [recommendations, setRecommendations] = useState([])

  const token = localStorage.getItem('spotifyAccessToken');

  const spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(token);

  const flavorProfile = { sweet: true, salty: false, crunchy: true };

  useEffect(() => {
    async function fetchMyAPI() {
      const recommendations = await getRecommendation(spotifyApi, flavorProfile.sweet, flavorProfile.salty, flavorProfile.crunchy)
      setRecommendations(recommendations)
    }
    try {
      fetchMyAPI()
    } catch (e) {
      console.error(e);
    }
  }, [])

  console.log('TEST', typeof (recommendations), recommendations)

  return (
    <div class="TunesBackground">
      <h1 class="tunestop">Here are your delicious tunes</h1>
      <div class="tunesbody">
        <ul>
          {recommendations.map((value, index) => {
            return (
              <li key={index}>
              <div class="three-way">
                <div class="image-item">
                  <img
                    class="songcover-item"
                    src={value[3]}
                    alt="sample"
                    width="100"
                    height="100"
                  ></img>
                </div>
                <div class="titles">
                  <h1 class="songTitle">{value[0]}</h1>
                  <h2 class="artist">{value[1]}</h2>
                </div>
                <div class="details">
                  <p>
                    This will be some blank filler text until I think of something
                    cool or witty to put in here oh well haha isn't it funny that
                    flamingos exist Idk why it's so funny to me</p>
                </div>
              </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  );
}

export default FlavorBasedTuneCurration;
