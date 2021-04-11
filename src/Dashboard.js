import React from 'react'
import './JSonParse'
const SpotifyWebApi = require('spotify-web-api-node')

export default function Dashboard({access_token}) {

    const accessToken = access_token
    console.log("Access Token: "+accessToken)

    const spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(accessToken);

    return (
        <div>
            This is a dashboard. You logged in with spotify! 
        </div>
    )
}
