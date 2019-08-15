let response;
const channels = [];
const channelIds = [];
const playlists = [];
const vids = [];
/**
 * Sample JavaScript code for youtube.subscriptions.list
 * See instructions for running APIs Explorer code samples locally:
 * https://developers.google.com/explorer-help/guides/code_samples#javascript
 */

function authenticate() {
  return gapi.auth2
    .getAuthInstance()
    .signIn({ scope: "https://www.googleapis.com/auth/youtube.readonly" })
    .then(
      function() {
        console.log("Sign-in successful");
      },
      function(err) {
        console.error("Error signing in", err);
      }
    );
}
function loadClient() {
  gapi.client.setApiKey("AIzaSyCiBbjgErATrxftURahHOb2QnQswVPmY2c");
  return gapi.client
    .load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
    .then(
      function() {
        console.log("GAPI client loaded for API");
      },
      function(err) {
        console.error("Error loading GAPI client for API", err);
      }
    );
}
// Make sure the client is loaded and sign-in is complete before calling this method.
function execute() {
  return gapi.client.youtube.subscriptions
    .list({
      part: "snippet,contentDetails",
      mine: true,
      maxResults: 15
    })
    .then(function(response) {
      this.response = response;
      for (let i = 0; i < this.response.result.items.length; i++) {
        channelIds.push(this.response.result.items[i].snippet.channelId);
        channels.push(this.response.result.items[i]);
        const p = document.createElement("p");
        // console.log(response.result.items[i]);
      }
    })
    .then(
      function(response) {
        // Handle the results here (response.result has the parsed body).
        console.log("Response", this.response);
      },
      function(err) {
        console.error("Execute error", err);
      }
    );
}
gapi.load("client:auth2", function() {
  gapi.auth2.init({
    client_id:
      "693361181160-606m03ck0og0l1ati77naa9li3c4heul.apps.googleusercontent.com"
  });
});

function getVids() {
  return gapi.client.youtube.videos
    .list({
      part: "snippet,contentDetails,statistics",
      maxResults: 13,
      myRating: "like"
    })
    .then(
      function(response) {
        // const cards = document.getElementsByClassName("card"); // array of all cards

        for (let i = 0; i < response.result.items.length; i++) {
          const vidLink = `https://www.youtube.com/embed/${
            response.result.items[i].id
          }`;
          vids.push(
            `https://www.youtube.com/embed/${response.result.items[i].id}`
          );
        }
        /**
         *
         *
         */
        const inners = document.getElementById("inner");
        const section = document.getElementsByClassName(
          "carousel-item active"
        )[0];
        const cardGroup = document.getElementsByClassName("card-group");
        for (let i = 0; i < vids.length; i++) {
          const group = i / 3;
          const iframe = document.createElement("iframe");
          iframe.src = vids[i];
          iframe.allowFullscreen = true;

          const card = document.createElement("div");
          card.appendChild(iframe);
          card.className = "card";

          cardGroup[0].appendChild(card);

          // const item = document.createElement("div");
          // const group = document.createElement("div");
          // const card = document.createElement("div");
          // inner.appendChild(item);
          // item.appendChild(group);
          // group.appendChild(card);
          // card.appendChild(iframe);
          // inner.className = "carousel-inner";
          // item.className = "carousel-item";
          // group.className = "card-group";
          // card.className = "card";
        }
        // Handle the results here (response.result has the parsed body).
        console.log("Response", response);
      },
      function(err) {
        console.error("Execute error", err);
      }
    );
}
gapi.load("client:auth2", function() {
  gapi.auth2.init({
    client_id:
      "693361181160-606m03ck0og0l1ati77naa9li3c4heul.apps.googleusercontent.com"
  });
});
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
      "Bearer BQD9U-xyaC8zG0qiMFsGW6-B5k5CTThLoXPdFSF6sXyDG-Jr16XL2uWZ29wSqwLdfVAhSw0HjRKGiMsOUY9WcIFgVcUbcwxBUCv41J97s-N5Ft83wbT8xC68sct3l47CUBy0xnGZPlkW1A7XFOVnJKK3wZxgIV3oeNhrlqIzPRWpw7Y"
  }
})
  .then(function(respon) {
    return respon.json();
  })
  .then(function(myJson) {
    // Makes var to the amount of playlist in the account. So if user has 3 playlist, it matches it.
    let playlistLength = myJson.items.length;

    for (let i = 0; i < playlistLength; i++) {
      // embedUrl = the link to original link to spotify playlist
      let embedUrl = myJson.items[i].external_urls.spotify;
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
  const carouselExampleControls_2 = document.getElementById(
    "carouselExampleControls_2"
  );
  const iframe = document.createElement("iframe");
  iframe.src = data;
  // create elements
  const itemPlaylist = document.createElement("div");
  const groupPlaylist = document.createElement("div");
  const cardPlaylist = document.createElement("div");
  // Append/put divs into divs
  innerPlaylist.appendChild(itemPlaylist);
  itemPlaylist.appendChild(groupPlaylist);
  groupPlaylist.appendChild(cardPlaylist);
  cardPlaylist.appendChild(iframe);

  // Give class names so slideshow can work
  innerPlaylist.className = "inner-spotify";
  itemPlaylist.className = "carousel-item-spotify";
  groupPlaylist.className = "card-group-spotify";
  cardPlaylist.className = "card-spotify";
  // Spotify needs iframes to be encrypted
  iframe.allow = "encrypted-media";
  iframe.allowTransparency = "true";
  iframe.width = "100%";
  iframe.height = "380px";
};
