const apiKey = "128021619emshab73d90a7f58805p108eacjsn084f36f61a53"; // actual RapidAPI key
const appendSpotifyData = document.querySelector(".album-art");
const btnTest = document.querySelector(".search-btn-test");
const modalTrigger = document.querySelector(".lyric-card");
const modalWindow = document.querySelector(".modal");

// Function to make Genius Lyrics Api call
const getArtistData = () => {
  // Get the search value from the URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const searchInputVal = urlParams.get("search");

  // Check if searchInputValue exists and make API call if needed
  if (searchInputVal) {
    // dynamically Update the title based on the search input
    document.querySelector(
      ".search-results-heading"
    ).innerText = `Search Results for ${searchInputVal}`;

    // Create the API URL with the search query
    const apiUrl = `https://genius-song-lyrics1.p.rapidapi.com/search/?q=${encodeURIComponent(
      searchInputVal
    )}&per_page=10`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "genius-song-lyrics1.p.rapidapi.com",
      },
    };

    // Make fetch request
    fetch(apiUrl, options)
      .then((response) => response.json())
      .then((data) => {
        // Display results in console log
        console.log(data);

        for (let i = 0; i < 10; i++) {
          // Assuming 'data' is an array containing objects with a 'result' property
          var lyricContainer = document.querySelector(".lyric-data");

          // Create a new div element for each iteration
          var thumbElement = document.createElement("div");
          thumbElement.classList.add("lyric-card"); // added the class with existing properties
          thumbElement.classList.add("hover-effect"); // added the hover effect which pre-exists

          // Access the image URL from the 'data' array
          var imageUrl = data.hits[i].result.song_art_image_thumbnail_url;
          var title = data.hits[i].result.title;
          // console.log(title);

          // Create an image element
          var img = document.createElement("img");
          // Set the source attribute to the image URL
          img.src = imageUrl;

          // Set the width and height attributes to 300 pixels
          img.width = 300;
          img.height = 300;

          // Set the innerHTML of the thumbElement to an img tag with the specified URL
          thumbElement.innerHTML = `<img src='${imageUrl}' alt='Thumbnail Image'><h4 style="color:#99CC66; text-align: center; margin-top: 10px;">${title}</h4>`;

          // Append the thumbElement to the lyricContainer
          lyricContainer.appendChild(thumbElement);

          // Pass the title to the spotifyApiCall function
          spotifyApiCall(title);
        }
      })
      .catch((error) => {
        console.error("Baboon: Problem fetching data", error);
      });
  }
};

//Function to run the songId parameter to get the specific lyrics and print on the page
const getLyrics = (songId) => {
  // Create the API URl with search query parameters
  const apiUrl = `https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/?id=${songId}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": "genius-song-lyrics1.p.rapidapi.com",
    },
  };

  // Make the fetch request
  fetch(apiUrl, options)
    .then((response) => response.json())
    .then((data) => {
      //Display Api response once songId is run as parameter
      console.log("API response for songId", songId, ":", data);
      console.log(data.lyrics);
      // Check if pathway and its steps exists. Uses optional chaining for nested objects, it checks each step and will return null if one pathway does not exist.
      // efficient check to make sure pathways are present and if not we know where to look for issues.
      if (data?.lyrics?.lyrics?.body?.html) {
        // Get the lyrics content
        const lyrics = data.lyrics.lyrics.body.html;
        console.log(lyrics);

        // Get the lyrics container
        const lyricsContainer = document.getElementById("lyrics-container");

        console.log(lyricsContainer);

        // Set the HTML content into <p> tags, prints lyrics to page
        lyricsContainer.innerHTML = `<p>${lyrics}</p>`;
        // Error message incase the lyrics arent found
      } else {
        console.error("No lyrics found for songId:", songId);
      }
    })
    .catch((error) => {
      console.error("Problem fetching lyrics:", error);
    });
};

// function to make the spotify API call
const spotifyApiCall = (title) => {
  // Create the API URL
  const SpotifyApiUrl = `https://spotify23.p.rapidapi.com/search/?q=${encodeURIComponent(
    title
  )}&type=tracks&offset=0&limit=1&numberOfTopResults=1`;

  // Define the options for the fetch request, including headers with API key
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": apiKey, // Ensure 'apiKey' is defined somewhere in your code
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    },
  };

  // Make the fetch request to the Spotify API
  fetch(SpotifyApiUrl, options)
    .then((response) => response.json())
    .then((data) => {
      // Display the API response data and create the Spotify link
      console.log(data);
      createSpotifyLink(data, title);
    })
    .catch((error) => {
      // Handle errors during the API call
      console.error("Error: Problem fetching data", error);
    });
};

// Function to create a Spotify link and display it on the page
const createSpotifyLink = (data) => {
  // Create an anchor tag for the Spotify link
  const anchorTag = document.createElement("a");

  // Extract the Spotify URL from the API response
  var songUrl = data.tracks.items[0].data.albumOfTrack.sharingInfo.shareUrl;

  // Set the href attribute of the anchor tag
  anchorTag.href = songUrl;

  // Set the text content for the link (customize as needed)
  anchorTag.textContent = "Spotify Link";

  // Find the HTML element with the class 'lyric-content'
  const lyricContentElement = document.querySelector(".lyric-content");

  // Update the innerHTML of the element to display the link label
  lyricContentElement.innerHTML = "Link: ";

  // Append the anchor tag to the 'lyric-content' div
  lyricContentElement.appendChild(anchorTag);
};

// Function to initiate the Spotify API call and display results
const displaySpotifyResults = (title) => {
  // Call the Spotify API with the provided title
  spotifyApiCall(title);
};

// Event listener for button click to display spotify result
// btnTest.addEventListener("click", displaySpotifyResults);

// Call the function getLyricData
getArtistData();

// On Click Event listener for modal boxes that are generated by the search results
modalTrigger.addEventListener("click", function (title) {
  modalWindow.style.display = "block";
  displaySpotifyResults(title);
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modalWindow) {
    modalWindow.style.display = "none";
  }
};

// Call the function getLyricData
// getLyricData();
