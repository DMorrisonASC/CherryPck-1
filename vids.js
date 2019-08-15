// JS for Spotify API

// WHAT CODE DOES:
//
/* 
    Gets users playlist and displays it in the index.html
*/
// First get token from spotify to access data
fetch("https://api.spotify.com/v1/me/playlists", {
  headers: {
    "Content-Type": "application/json",
    // 'Content-Type': 'application/x-www-form-urlencoded',
    Authorization:
      "Bearer BQBNZAOMaGMRrGrQUwJCoyVnjQ_HfU5xaKRiOkqMORxA-GYCUKus9o0Kl6VTb-ET7Rjk21ak2bwRvxOWm-zF69l6iK05kZ9ebZ6CRvcLlsgLtattG2c6nD4CwYARMWrx1Cl1HfsUvZORxMZ2jURWQXQjNEdw27_nRcH6jQb4mvLxViU"
  }
})
  .then(function(respon) {
    return respon.json();
  })
  .then(function(spotifyJson) {
    console.log(spotifyJson);
    // Makes var to the amount of playlist in the account. So if user has 3 playlist, it matches it.
    let playlistLength = spotifyJson.items.length;

    for (let i = 0; i < playlistLength; i++) {
      // embedUrl = the link to original link to spotify playlist
      let embedUrl = spotifyJson.items[i].external_urls.spotify;
      // splits link to spotify playlist, since the only requirement for accessing full playlist
      //  is adding the "word embed/".
      // Example https://open.spotify.com/playlist/37i9dQZF1DX0XUsuxWHRQd -> https://open.spotify.com/embed/playlist/37i9dQZF1DX0XUsuxWHRQd
      const splitter = "https://open.spotify.com/";
      // split converts string into an array in order to decide where to place "embed/"
      let split = embedUrl.split(splitter);
      split[0] = "embed/";
      split.unshift(splitter);
      // .join turn array back to string, ('') = not including any spaces
      embedUrl = split.join("");
      console.log(embedUrl);

      userData(embedUrl);
    }
  });

// This function puts the fetched data(user's playlist) into slideshow
const userData = data => {
  // iframe.allowTransparency = "true"
  // Puts iframes of Spotify into seperate slideshow
  const innerPlaylist = document.getElementById("innerPlaylist");
  const iframe = document.createElement("iframe");
  iframe.src = data;
  // create element

  const itemPlaylist = document.createElement("div");
  const groupPlaylist = document.createElement("div");
  const cardPlaylist = document.createElement("div");
  // Append/put divs into divs
  innerPlaylist.appendChild(itemPlaylist);
  itemPlaylist.appendChild(groupPlaylist);
  groupPlaylist.appendChild(cardPlaylist);
  cardPlaylist.appendChild(iframe);
  // Give class names so slideshow can work
  innerPlaylist.className = "spotify-inner";
  itemPlaylist.className = "carousel-item-spotify";
  groupPlaylist.className = "card-group-spotify";
  cardPlaylist.className = "card-spotify";
  // Spotify needs iframes to be encrypted
  iframe.allow = "encrypted-media";
  iframe.allowTransparency = "true";
  iframe.width = "100%";
  iframe.height = "380px";
};
