import React, { useEffect, useState } from "react";
import "./FlavorBasedTuneCurration.css";
import { getRecommendation, mapFoodToRecs } from "./JSonParse"
const SpotifyWebApi = require('spotify-web-api-node')

function FlavorBasedTuneCurration(props) {
  const [recommendations, setRecommendations] = useState([])
  const [foodConstraints, setFoodConstraints] = useState([])

  const token = localStorage.getItem('spotifyAccessToken');

  const spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(token);

  const flavorProfile = { sweet: true, salty: false, crunchy: true };

  useEffect(() => {
    async function fetchMyAPI() {
      const recommendations = await getRecommendation(spotifyApi, flavorProfile.sweet, flavorProfile.salty, flavorProfile.crunchy)
      setRecommendations(recommendations.slice(0, 15))

      const foodRecs = await mapFoodToRecs(spotifyApi, flavorProfile.sweet, flavorProfile.salty, flavorProfile.crunchy)
      setFoodConstraints([foodRecs.constr.seed_genres, foodRecs.constr.target_loudness, foodRecs.constr.target_energy, foodRecs.constr.target_danceability])
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
      <div class="tunesbody">
      {foodConstraints.length > 0 && 
        <div class="description">
          Based on your meal and some info about you like 3 of your favorite genres, <b>{foodConstraints[0][0]}</b>, <b>{foodConstraints[0][1]}</b>, and 
          &nbsp;<b>{foodConstraints[0][2]}</b>, the average loudness of your music <b>{foodConstraints[1]}</b>, energeticness <b>{foodConstraints[2]}</b> and 
          danceability <b>{foodConstraints[3]}</b>, you should listen to one of these songs with your meal!
        </div>
      }
        <ul>
          {recommendations.map((value, index) => {
            return (
              <li key={index}>
                <div class="container">
                  {recommendations.map((value, index) => {
                    return (
                      <div class="unit">
                        <a href={value[3]}>
                          <img src={value[2]}></img>
                        </a>
                        <p class="title"key={index}>{value[0]} <br/> </p>
                        <p class="artist">{value[1]}</p>
                      </div>
                    );
                  })}
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
