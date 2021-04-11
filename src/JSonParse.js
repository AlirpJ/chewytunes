const { getCurrentUpdateLanePriority } = require('@psychobolt/react-paperjs/dist/index.dev');
const SpotifyWebApi = require('spotify-web-api-node')
// const token = "BQAJrc9skfHoLOoEvy3BLds__TXA8AkVByR8bIQrhUjbJr9XCFUXs0G92Y1icPsHjykbnIV9flCye2I10HW84JYKg-RSudnPn8vxUv0VtFLlK9gCeBoeUhrPP8jh0FeBEXL0mFIAzl5Q9jR4iPR0QRTqXH1XFusaCXy2WdSVWvS14r3d2lR8pV6UbpEtChb7haPeu2BGErZyEEwtFhYhH85KS2K7WEVJk1SKToxPqc-G8uQF530_iRcKXQbBK4AHWg4uqa4VPnOdjexlfQrd"
const playlistID = "37i9dQZEVXbLRQDuF5jeBp"

// const spotifyApi = new SpotifyWebApi();
// spotifyApi.setAccessToken(token);

// example function that grabs a top 50 playlist and parses it for the IDs of each song
// which is currently logged to the console because i'm gay and can't figure out what
// else to do with it for now
export async function getTop50(spotifyApi) {
    const playlistData = await spotifyApi.getPlaylist(playlistID);
    const tracks = []
    for (let track of playlistData.body.tracks.items) {
        tracks.push(track.track.id);
    }
    console.log(tracks);
    return tracks;
}

// returns 3 genres which are used to seed the recommendation
// 66% chance of being pop, 33% chance of being any random seedable genre
// this leads to some wacky fucking shit lmao
async function getGenres(spotifyApi) {
    let genre = [];
    for (var i = 0; i < 3; i++) {
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
export function getRandom(list) {
    return list[Math.floor((Math.random()*list.length))];
}

// takes in flavors from front-end and maps them to various stats, which
// are then used to calculate recommendations for someone's songs.
// reccs are also based upon a user's personal taste so it's not totally ass
async function mapFoodToRecs(spotifyApi, sweet, salty, crunchy) {
    // will take food items and return an artist, genre, and track to base recommendations 
    // off of. is it possible to grab all of those from a user's top songs? much to think about.
    // current structure of the food item request has a bunch of constraints:
    //    sweet or savory
    //    crunchy or soft
    //    etc.
    // These stats will all be adjusted based upon selected buttons from a user
    const topTracks = await getUserTopTracks(spotifyApi);
    const topArtists = await getUserTopArtists(spotifyApi);
    var energy = 0;
    var loudness = 0;
    var danceability = 0;
    var return_text = "";
    if (sweet) {
        energy = 0.7;
        loudness = -6;
        danceability = 0.65;
        return_text = "Sweet foods are complimented well by higher energy and higher pitched music. "
        + "As a result, we're recommending some really high energy music that might suit your fancy."
    }
    if (salty) {
        loudness = -5;
        energy = 0.45;
        danceability = 0.5;
        return_text = "Salty foods are a good choice! "
        + "Savory, salty foods are best copmlimented by more subtle, calming music. "
        + "Spotify has 'energy' stats for tracks, which rate how much of a jam a song can be. "
        + "We're gonna recommend some lower-energy tracks to really bring out the savory flavors in your meal. "
        + "Trust me though, that doesn't make them any less of a bop!"
    }
    if (crunchy) {
        loudness = -4;
        const crunchyText = "Seems you like crunchy foods! "
        + "Believe it or not, louder music helps amplify the 'crunch' you feel. "
        + "We're recommending some tracks based on how much 'loudness' Spotify ranks them. Get ready for some absolute bangers!!"
    }
    let constraints = {
        seed_genres: await getGenres(spotifyApi),
        seed_tracks: topTracks[0],
        seed_artists: topArtists[0],
        min_popularity: 50,
        target_loudness: loudness,
        target_energy: energy,
        target_danceability: danceability
    };
    return {constr: constraints, txt: return_text};
    // here's where we implement the logic from the buttons c:
}

// uses users music taste and front-end flavor selection to generate a profile of music
// recommendations to enchance user's ability to taste...?
// i still can't believe this is real
export async function getRecommendation(spotifyApi, sweet, salty, crunchy) {
    // take in an artist, genre, and track, and generate recs based on those
    // obtain those from a user's top tracks in combination with food-based
    // constraints form above. the constraints come from mapFoodToRecs()
    // TODO: replace constraints here with result from mapFoodToRecs()
    let songRecs = [];
    let foodConstraints = await mapFoodToRecs(spotifyApi, sweet, salty, crunchy);
    let text = foodConstraints.txt
    let reccs = await spotifyApi.getRecommendations(foodConstraints.constr)
    for (let track of reccs.body.tracks) {
        songRecs.push([track.name, track.artists[0].name, track.album.images[1].url, track.external_urls.spotify]);
    }
    console.log(songRecs);
    return songRecs;
}

// grabs a user's top 10 tracks
export async function getUserTopTracks(spotifyApi) {
    let topTrack = [];
    const topTracks = await spotifyApi.getMyTopTracks({limit : 10});
    for (let track of topTracks.body.items) {
        topTrack.push(track.id);
    }
    return topTrack;
}

// grabs a user's top 10 artists
async function getUserTopArtists(spotifyApi) {
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
async function getTopStats(spotifyApi) {
    let topTracks = await getUserTopTracks(spotifyApi);
    const dances = [];
    const energy = [];
    const loudness = [];
    const liveness = [];
    const tempo = [];
    for (const track of topTracks) {
        let trackFeatures = await spotifyApi.getAudioFeaturesForTrack(track);
        dances.push(trackFeatures.body.danceability);
        energy.push(trackFeatures.body.energy);
        loudness.push(trackFeatures.body.loudness);
        liveness.push(trackFeatures.body.liveness);
        tempo.push(trackFeatures.body.tempo);
    }
    const average = arr => arr.reduce((sume, el) => sume + el, 0) / arr.length;
    const returnValues = {
        danceability: average(dances),
        energy: average(energy),
        loudness: average(loudness),
        liveness: average(liveness),
        tempo: average(tempo)
    }
    // console.log(returnValues);
    return returnValues;
}

export async function mapStatsToFlavors(spotifyApi) {
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
    let stats = await getTopStats(spotifyApi);
    let highDance = stats.danceability > 0.65 ? true : false
    let highEnergy = stats.energy > 0.65 ? true : false
    let loud = stats.loudness > -6.3 ? true : false
    let speedy = stats.tempo > 120 ? true : false 
    // here's where we put various checks for stats and recommend various
    // panera products based on that. i'm probably gonna randomize it a bit so that
    // each thing gets recommended and that the project doesn't get stale 
    if (highEnergy) {
        // front end, this is all yours to fuck with. go wild. these are recommendations
        const highEnergyString = "Seems like you enjoy pretty energetic music! Energetic music tends to bring out the sweeter flavors in food, and" 
         + " helps your taste buds detect more of the sweet tones."
         + " Additionally, energetic music tends to be loud."
         + " Loudness, for some reason, tends to bring out the 'crunch' in some foods."
         + " For you, I think I'd recommend a salad."
         + " Interested in a Panera item? What about a..."
         return [highEnergyString, SUMMERY_ITEMS]
    } else if (highDance) {
        const highDanceString = "Seems like you're a fan of dance-y music. "
        + "Your top tracks have a lot of energy in them! I like it! "
        + "Dance-y music and energy tends to lend itself well to"
        + " bold, sweet flavors. For you, I'm thinking something sweet."
        + " Wanna try something from Panera? How about a "
        return [highDanceString, SWEET_ITEMS]
    } else if (loud) {
        const loudString = "Seems like you like lively music!"
        + " Lively music tends to bring out many of the sweet and sour"
        + " flavors present in your food. I'm thinking something that"
        + " can get the best of both worlds. How about a salad of some sort? "
        + " Bold flavors are another big thing with lively music, so"
        + " maybe you'd like to try a BBQ Chicken Salad?"
        + " I hear Panera has a really good one..."
        return [loudString]
    } else if (speedy) {
        const speedyString = "You're a fan of fast-paced music, aren't you?"
        + " At least, that's what your top tracks imply."
        + " Music with a high tempo tends to energize us. "
        + " High energy and food don't always go together, according to research. "
        + " We tend to eat faster and as a result miss out on a lot of the flavor."
        + " Funny enough, high energy music also brings out more savory flavors!"
        + " Sounds like a wonderful pairing with a good soup..  ."
        return [speedyString, SOUPS]
    } else {
        const savoryString = "Hm...seems like you're into more relaxed music. "
        + "Slower jams, perhaps? "
        + "Slower tunes tend to bring out more subtle flavors. "
        + "Something nice, warm, and savory would probably suit you best. "
        return [savoryString, SAVORY_ITEMS]
    }
}
 
export async function getUserTopSongs(spotifyApi) {
    let songRecs = []
    let songs = await spotifyApi.getMyTopTracks();
    for (const track of songs.body.items) {
        songRecs.push([track.album.images[1].url, track.name, track.artists[0].name, track.external_urls.spotify])
    }
    console.log(songRecs);
    return songRecs;
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
// getRecommendation();
// getTopStats();
// mapStatsToFlavors();
// getUserTopSongs();