import React from 'react'
import { Container } from "react-bootstrap"

var client_id = '992f2aaaf07c467fb5fd757f91391847'; // Your client id
var redirect_uri = 'http://localhost:3000'; // Your redirect uri

// SCOPES NEED TO BE MODIFIED FOR OUR USE
const AUTH_URL = "https://accounts.spotify.com/authorize?client_id="+client_id+"&response_type=code&redirect_uri="+redirect_uri+"&scope=streaming%20user-read-email"
    +"%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"
// ^^^ SCOPES ARE NOT PROPERLY UTILIZED YET ^^^

    export default function Login() {
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
