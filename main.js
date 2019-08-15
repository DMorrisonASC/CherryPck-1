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
      maxResults: 12
    })
    .then(function(response) {
      this.response = response;
      for (let i = 0; i < this.response.result.items.length; i++) {
        channelIds.push(this.response.result.items[i].snippet.channelId);
        channels.push(this.response.result.items[i]);
        const p = document.createElement("p");
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
      maxResults: 12,
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
        let j = 0;
        let inner;
        let group;
        let card;
        const item = document.getElementsByClassName("carousel-item active");
        for (let i = 0; i < vids.length / 3; i++) {
          const group = document.createElement("div");
          group.className = "card-group";
          item[i].appendChild(group);
        }
        for (let i = 0; i < vids.length; i++) {
          const group = document.getElementsByClassName("card-group")[
            Math.floor(i / 3)
          ];

          const iframe = document.createElement("iframe");
          iframe.src = vids[i];
          iframe.allow = true;

          group.appendChild(iframe);
          item[Math.floor(i / 3)].appendChild(group);
          //  if (j === 0) {
          //   inner = document.getElementById("inner");
          //   item = document.createElement("div");
          //   group = document.createElement("div");
          //   item.className = "carousel-item active";
          //   group.className = "card-group";
          //   item.appendChild(group);
          //   inner.appendChild(item);
          //   card = document.createElement("div");
          //   card.className = "card";
          //   iframe = document.createElement("iframe");
          //   iframe.src = vids[i];
          //   iframe.allowFullscreen = true;
          //   card.appendChild(iframe);
          //   group.appendChild(card);
          //   console.log(j);
          //   j++;
          // } else if (j < 3) {
          //   card = document.createElement("div");
          //   card.className = "card";
          //   iframe = document.createElement("iframe");
          //   iframe.src = vids[i];
          //   iframe.allowFullscreen = true;
          //   card.appendChild(iframe);
          //   group.appendChild(card);
          //   console.log(j);
          //   j++;
          //   if (j === 3) j = 0;
          // }
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
