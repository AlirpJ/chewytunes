import React from 'react'
import FlavorBasedTuneCurration from './FlavorBasedTuneCurration';
import Login from './Login'

export default function BottomOption() {
    var access_token = new URLSearchParams(window.location.hash).get("#access_token");
    localStorage.setItem("spotifyAccessToken", access_token);
    console.log("access token set in upoptions", access_token);

    if (access_token) {
        return <FlavorBasedTuneCurration />
    } else {
        return <Login />
    }
}
