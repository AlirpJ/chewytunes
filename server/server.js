const express = require('express');
const spotifyWebApi = require('spotify-web-api-node');
const app = express()

var client_id = '992f2aaaf07c467fb5fd757f91391847'; // Your client id
var client_secret = 'no_secrets_here'; // Your secret
// var client_secret = document.getElementById("client_secret").value;
var redirect_uri = 'http://localhost:3000'; // Your redirect uri



// Logging in!
// authorizationCodeGrant: Given proper code, provide access token. Otherwise, send status 400
app.post('/login', (req, res) => {
    const code = req.body.code
    const spotifyWebApi = new spotifyWebApi({
        redirectUri: redirect_uri,
        clientId: client_id,
        clientSecret: cliend_secret
    })
    spotifyApi.authorizationCodeGrant(code)
    .then(data => {
        res.json({
            accessToken: data.body.access_token, //accessToken ?
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        })
    })
    .catch(() => {
        res.sendStatus(400)
    })
})

// app.get('/login', function(req, res) {
//   var scopes = 'user-read-private user-read-email';
//   res.redirect('https://accounts.spotify.com/authorize' +
//     '?response_type=code' +
//     '&client_id=' + client_id +
//     (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
//     '&redirect_uri=' + encodeURIComponent(redirect_uri));
//   });