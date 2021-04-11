import React from 'react'
import { Container } from "react-bootstrap"

var client_id = '992f2aaaf07c467fb5fd757f91391847'; // Your client id
var redirect_uri = 'http://localhost:3000'; // Your redirect uri

const AUTH_URL = "https://accounts.spotify.com/authorize?response_type=token&client_id="+client_id+"&redirect_uri="+redirect_uri+"&scope=user-top-read&state=123"

    export default function Login() {

      //const spotifyApi = new SpotifyWebApi();
      //spotifyApi.setAccessToken(accessToken);
      //spotifyApi.createAuthorizeURL(['user-read-only'], '123', true, accessToken)

        return (
          <Container
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "100vh" }}
          >
            <a className="btn btn-success btn-lg" href={AUTH_URL}>
              Login With Spotify
            </a>
          </Container>
        )
      }
