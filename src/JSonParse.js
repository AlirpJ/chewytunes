const { getCurrentUpdateLanePriority } = require('@psychobolt/react-paperjs/dist/index.dev');
const SpotifyWebApi = require('spotify-web-api-node')
const token = "BQBAqCkWvXvh-bW1Y6n2dry1WLIIcRyBFRCJlgPyKlPUbo3pC5VEn5u0RW-H4C-aNIumPlAmtDK1vy-g1ztK3ogiLPg1RgnSSOnB8wnl8DSu1tsDfiPt6vLBGizuMZoqCsXmQrjW10v3gsQ-tHjdNtohYfWVhiko162vkZ_i99DJOrwyODab9AthGZ8Ge2V2QwyB8vZD6YB4TMWYILqWDi0c64OddIZ51TfClvNAAIZubfmmtzjVQDYc1bf8iNGOO-3z1Aa-MbOKur1jr2d5"
const playlistID = "37i9dQZEVXbLRQDuF5jeBp"

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(token);

// example function that grabs a top 50 playlist and parses it for the IDs of each song
// which is currently logged to the console because i'm gay and can't figure out what
// else to do with it for now
async function getTop50() {
    const playlistData = await spotifyApi.getPlaylist(playlistID);
    tracks = {}
    for (let track of playlistData.body.tracks.items) {
        let trackID = track.track.id;
        let trackName = track.track.name;
        tracks[trackName] = trackID
    }
    return tracks;
}

// populates the global variable "genre" with a random genre;
// 66% chance of being pop, 33% chance of being something random
async function getGenres() {
    let genre = [];
    for (i = 0; i < 3; i++) {
        if (Math.random() > 0.33) {
            genre.push('pop');
        } else {
            await spotifyApi.getAvailableGenreSeeds()
                .then(function(result) {
                    genre.push(getRandomGenre(result.body.genres));
                })
        }
    }
    console.log(genre);
    return genre;
}

function getRandomGenre(listOfGenres) {
    return listOfGenres[Math.floor((Math.random()*listOfGenres.length))];
}

async function mapFoodToRecs() {
    // will take food items and return an artist, genre, and track to base recommendations 
    // off of. is it possible to grab all of those from a user's top songs? much to think about.
    // current structure of the food item request has a bunch of constraints:
    //    sweet or savory
    //    crunchy or soft
    //    etc.
    // These stats will all be adjusted based upon selected buttons from a user
    let constraints = {
        seed_genres: await getGenres(),
        seed_tracks: await getUserTopTracks(),
        seed_artist: await getUserTopArtist(),
        min_popularity: 50
    };
    // here's where we implement the logic from the buttons c:
}

async function getRecommendation() {
    // take in an artist, genre, and track, and generate recs based on those
    // obtain those from a user's top tracks in combination with food-based
    // constraints form above. the constraints come from mapFoodToRecs()
    // TODO: replace constraints here with result from mapFoodToRecs()
    let songRecs = [];
    let constraints = {
        seed_genres: await getGenres(),
        seed_tracks: [await getUserTopTracks()],
        seed_artists: [await getUserTopArtist()],
        min_popularity: 50,
        target_danceability: 0.30,
        target_energy: 0.5,
        target_liveness: 0.5,
        target_loudness: 0.5,
        target_tempo: 0.5,
        limit:  1
    }
    let reccs = await spotifyApi.getRecommendations(constraints)
    for (let track of reccs.body.tracks) {
        songRecs.push(track.name, track.artists[0].name, track.external_urls.spotify);
    }
    console.log(songRecs);
}

// grabs a user's top track to seed the recommendation
async function getUserTopTracks() {
    let topTrack = '';
    const topTracks = await spotifyApi.getMyTopTracks();
    topTrack = topTracks.body.items[0].id;
    console.log(topTrack);
    return topTrack;
}

// grabs a user's top artist to seed the reccomendation
async function getUserTopArtist() {
    let topArtist = '';
    const topTracks = await spotifyApi.getMyTopTracks();
    topArtist = topTracks.body.items[0].artists[0].id;
    console.log(topArtist);
}

// calls the functions as needed
getRecommendation();