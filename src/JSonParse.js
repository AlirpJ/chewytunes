const { getCurrentUpdateLanePriority } = require('@psychobolt/react-paperjs/dist/index.dev');
const SpotifyWebApi = require('spotify-web-api-node')
const token = "BQBsO7rw73fPTcErhXsZUlb-ianfKbLgadOrqqqRF10hZZo2d4bJnM3Dk3FhzvVZdr_sSNHsrKsmmmPxVtYM1IfsAyAZQPWJp50Vsi55krqTfjTUxHoASp2E9gakUbMr78v_tVSoon1aWRFi4keNqVluMLzPlY6Lw-f88Kt0Q-rUc9WEW0A8szBy-LuJH1RpxiABSc9c9JScgUf3jBjEglKuNHpUNSg7pONFhxhGPSCJvPJsu26yJylLJBQ80tVEF-pLXixKz-_4VsHZ5fQk"
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

// returns 3 genres which are used to seed the recommendation
// 66% chance of being pop, 33% chance of being any random seedable genre
// this leads to some wacky fucking shit lmao
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

// helper function for the above to get a random element from the array 
// can i make this into a lambda?
function getRandomGenre(listOfGenres) {
    return listOfGenres[Math.floor((Math.random()*listOfGenres.length))];
}

// takes in flavors from front-end and maps them to various stats, which
// are then used to calculate recommendations for someone's songs.
// reccs are also based upon a user's personal taste so it's not totally ass
async function mapFoodToRecs() {
    // will take food items and return an artist, genre, and track to base recommendations 
    // off of. is it possible to grab all of those from a user's top songs? much to think about.
    // current structure of the food item request has a bunch of constraints:
    //    sweet or savory
    //    crunchy or soft
    //    etc.
    // These stats will all be adjusted based upon selected buttons from a user
    let topTracks = await getUserTopTracks();
    let topArtists = await getUserTopArtists();
    let constraints = {
        seed_genres: await getGenres(),
        seed_tracks: topTracks[0],
        seed_artists: topArtists[0],
        min_popularity: 50
    };
    return constraints;
    // here's where we implement the logic from the buttons c:
}

// uses users music taste and front-end flavor selection to generate a profile of music
// recommendations to enchance user's ability to taste...?
// i still can't believe this is real
async function getRecommendation() {
    // take in an artist, genre, and track, and generate recs based on those
    // obtain those from a user's top tracks in combination with food-based
    // constraints form above. the constraints come from mapFoodToRecs()
    // TODO: replace constraints here with result from mapFoodToRecs()
    let songRecs = [];
    let constraints = await mapFoodToRecs();
    let reccs = await spotifyApi.getRecommendations(constraints)
    for (let track of reccs.body.tracks) {
        songRecs.push(track.name, track.artists[0].name, track.external_urls.spotify);
    }
    console.log(songRecs);
}

// grabs a user's top 10 tracks
async function getUserTopTracks() {
    let topTrack = [];
    const topTracks = await spotifyApi.getMyTopTracks({limit : 10});
    for (let track of topTracks.body.items) {
        topTrack.push(track.id);
    }
    console.log(topTrack);
    return topTrack;
}

// grabs a user's top 10 artists
async function getUserTopArtists() {
    let topArtist = [];
    const topArtists = await spotifyApi.getMyTopArtists({limit : 10});
    for (let artist of topArtists.body.items) {
        topArtist.push(artist.id);
    }
    console.log(topArtist);
    return topArtist;
}

// analyses a user's top 10 songs and retrieves the average of a couple stats
// these averages are used as thresholds to recommend different food items
// based on what type of music these bitches listen to
async function getTopStats() {
    let topTracks = await getUserTopTracks();
    dances = [];
    energy = [];
    loudness = [];
    liveness = [];
    tempo = [];
    for (track of topTracks) {
        let trackFeatures = await spotifyApi.getAudioFeaturesForTrack(track);
        dances.push(trackFeatures.body.danceability);
        energy.push(trackFeatures.body.energy);
        loudness.push(trackFeatures.body.loudness);
        liveness.push(trackFeatures.body.liveness);
        tempo.push(trackFeatures.body.tempo);
    }
    const average = arr => arr.reduce((sume, el) => sume + el, 0) / arr.length;
    returnValues = {
        danceability: average(dances),
        energy: average(energy),
        loudness: average(loudness),
        liveness: average(liveness),
        tempo: average(tempo)
    }
    console.log(returnValues);
    return returnValues;
}

async function mapStatsToFlavors() {
    // stats here is a dicitionary containing the following stats:
    // danceability
    // energy
    // loudness
    // liveness
    // tempo
    // these stats will be used to calculate what kind of music someone should listen to
    // i.e. high avg tempo -> something more energetic, "sour"
    // high loudness -> crunchy shit, "umami"
    // high energy/danceability -> "sweet"
    let stats = await getTopStats();
    let highDance = stats.danceability > 0.7 ? true : false
    let highEnergy = stats.energy > 0.7 ? true : false
    let loud = stats.loudness > -5 ? true : false
    let lively = stats.liveness > 0.5 ? true : false
    let speedy = stats.tempo > 120 ? true : false
    // here's where we put various checks for stats and recommend various
    // panera products based on that. i'm probably gonna randomize it a bit so that
    // each thing gets recommended and that the project doesn't get stale
}
 

// calls the functions as needed for testing purposes
// getRecommendation();
// getTopStats();
// mapStatsToFlavors();