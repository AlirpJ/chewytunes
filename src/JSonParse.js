const { getCurrentUpdateLanePriority } = require('@psychobolt/react-paperjs/dist/index.dev');
const SpotifyWebApi = require('spotify-web-api-node')
const token = "BQCuwFjcHPQv7M-vxC7kXotw1b9LDjA8qJHuNQtuAh8R0C7wDxuJRq6gc6MwIC9Yiv1XM9Rf1B26Es1EDQSuCeefYAf-WXZkJOJs4fcZt4SBvoDt4T0LcTEX9e_fskmvDVuFmC6Qul5QlDXsOk62LO4XwTEdacCrzvbwV_fmF8V36vfl3BA1IWrh1EMZNZO7M7lzALe-d3O-pcYSXTX7T0kIwcAPhezNCMYQnkTewIEsbkhFz6qLQ-QDZBK_cem1Yq--mvxp9jt3oUBoZoqH"
const playlistID = "37i9dQZEVXbLRQDuF5jeBp"

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(token);

// example function that grabs a top 50 playlist and parses it for the IDs of each song
// which is currently logged to the console because i'm gay and can't figure out what
// else to do with it for now
async function getTop50() {
    const playlistData = await spotifyApi.getPlaylist(playlistID);
    tracks = []
    for (let track of playlistData.body.tracks.items) {
        tracks.push(track.track.id);
    }
    console.log(tracks);
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
                    genre.push(getRandom(result.body.genres));
                })
        }
    }
    console.log(genre);
    return genre;
}

// helper function for the above to get a random element from the array 
// can i make this into a lambda?
function getRandom(list) {
    return list[Math.floor((Math.random()*list.length))];
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
        songRecs.push([track.name, track.artists[0].name, track.external_urls.spotify, track.album.images[1].url]);
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
    // ---------------------------------------------------------------------------
    // all of these stats are based on averages obtained from running
    // getTopStats() on the top 50 tracks playlist from spotify 
    let stats = await getTopStats();
    let highDance = stats.danceability > 0.65 ? true : false
    let highEnergy = stats.energy > 0.65 ? true : false
    let loud = stats.loudness > -6.3 ? true : false
    let lively = stats.liveness > 0.2 ? true : false
    let speedy = stats.tempo > 120 ? true : false 
    // here's where we put various checks for stats and recommend various
    // panera products based on that. i'm probably gonna randomize it a bit so that
    // each thing gets recommended and that the project doesn't get stale 
    if (highEnergy) {
        // front end, this is all yours to fuck with. go wild. these are recommendations
        console.log("Seems like you enjoy pretty energetic music!");
        console.log("Energetic music tends to bring out the sweeter flavors in food,");
        console.log("And helps your taste buds detect more of the sweet tones.");
        console.log("Additionally, energetic music tends to be loud.");
        console.log("Loudness, for some reason, tends to bring out the 'crunch' in some foods.");
        console.log("For you, I think I'd recommend a salad.");
        console.log("Interested in a Panera item? What about a " + getRandom(SUMMERY_ITEMS) + "?");
    } else if (highDance) {
        console.log("Seems like you're a fan of dance-y music.");
        console.log("Your top tracks have a lot of energy in them! I like it!");
        console.log("Dance-y music and energy tends to lend itself well to");
        console.log("bold, sweet flavors. For you, I'm thinking something sweet");
        console.log("Wanna try something from Panera? How about a " + getRandom(SWEET_ITEMS) + "?");
    } else if (lively) {
        console.log("Seems like you like lively music!");
        console.log("Lively music tends to bring out many of the sweet and sour");
        console.log("flavors present in your food. I'm thinking something that");
        console.log("can get the best of both worlds. How about a salad of some sort?");
        console.log("Bold flavors are another big thing with lively music, so");
        console.log("maybe you'd like to try a BBQ Chicken Salad?");
        console.log("I hear Panera has a really good one...");
    } else if (speedy) {
        console.log("You're a fan of fast-paced music, aren't you?");
        console.log("At least, that's what your top tracks imply.");
        console.log("Music with a high tempo tends to energize us");
        console.log("High energy and food don't always go together, according to research");
        console.log("We tend to eat faster and as a result miss out on a lot of the flavor.");
        console.log("Funny enough, high energy music also brings out mroe savory flavors");
        console.log("Sounds like a wonderful pairing with a good soup!");
        console.log("Now, how about a Panera soup? Let's say... a " + getRandom(SOUPS) + "?");
    } else {
        console.log("Hm...seems like you're into more relaxed music.");
        console.log("Slower jams, perhaps?");
        console.log("Slower tunes tend to bring out more subtle flavors.");
        console.log("Something nice, warm, and savory would probably suit you best.");
        console.log("What about a " + getRandom(SAVORY_ITEMS) + " from Panera?");
    }
}
 
// panera bread menu items lmfao
const SAVORY_ITEMS = [
    "Pepperoni Flatbread Pizza",
    "Chipotle Chicken & Bacon Flatbread Pizza",
    "Margherita Flatbread Pizza",
    "Four Cheese Flatbread Pizza",
    "Cheese Flatbread Pizza",
    "Bacon Turkey Bravo",
    "Smokehouse BBQ Chicken",
    "Chipotle Chicken Avocado Melt",
    "Classic Grilled Cheese",
    "Roasted Turkey & Avocado BLT",
    "Toasted Frontega Chicken",
    "Toasted Steak & White Chedder",
    "Napa Almond Chicken Salad",
    "Tuna Salad",
    "Mediterranean Veggie",
    "Modern Caprese",
    "Mac & Cheese",
    "Broccoli Cheddar Mac & Cheese",
    "Summer Corn Cheddar",
    "Broccoli Cheddar Soup",
    "Homestyle Chicken Noodle Soup",
    "Creamy Tomato Soup",
    "Cream of Chicken & Wild Rice Soup",
    "Turkey Chili",
    "Bistro French Onion Soup",
    "Ten Vegetable Soup"
]

const SOUPS = [
    "Mac & Cheese",
    "Broccoli Cheddar Mac & Cheese",
    "Summer Corn Cheddar",
    "Broccoli Cheddar Soup",
    "Homestyle Chicken Noodle Soup",
    "Creamy Tomato Soup",
    "Cream of Chicken & Wild Rice Soup",
    "Turkey Chili",
    "Bistro French Onion Soup",
    "Ten Vegetable Soup"
]

const SWEET_ITEMS = [
    "Orange Scone",
    "Blueberry Scone",
    "Blueberry Muffin",
    "Chocolate Chip Muffie",
    "Cranberry Orange Muffin",
    "Pumpkin Muffin",
    "Chocolate Chipper Cookie",
    "Kitchen Sink Cookie",
    "Candy Cookie",
    "Cinnamon Roll",
    "Bear Claw",
    "Pecan Braid",
    "Chocolate Croissant"
]

const SUMMERY_ITEMS = [
    "Strawberry Poppyseed Salad with Chicken",
    "Green Goddess Cobb Salad with Chicken",
    "Fuji Apple Salad with Chicken",
    "Caesar Salad",
    "Caesar Salad with Chicken",
    "Greek Salad",
    "Asian Sesame Salad with Chicken",
    "Southwest Chile Lime Ranch Salad with Chicken",
    "BBQ Chicken Salad",
    "Teriyaki Chicken & Broccoli Bowl",
    "Baja Bowl with Chicken",
    "Mediterranean Bowl with Chicken",
    "Baja Bowl",
    "Mediterranean Bowl"
]

// calls the functions as needed for testing purposes
// getTop50();
getRecommendation();
// getTopStats();
mapStatsToFlavors();