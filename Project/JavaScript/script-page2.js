// Get the search query from the URL parameters
const urlParams = new URLSearchParams(window.location.search);
const searchInputVal = urlParams.get("search");
const btnTest = document.querySelector(".search-btn-test");

// Arkaw's Code
var modalTrigger = document.querySelector(".lyric-card");
var modalWindow = document.querySelector(".modal");

const apiKey = "128021619emshab73d90a7f58805p108eacjsn084f36f61a53"; // actual RapidAPI key

// Function to make Genius Lyrics Api call
const getLyricData = () => {
  // Get the search value from the URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const searchInputVal = urlParams.get("search");

  // Check if searchInputValue exists and make API call if needed
  if (searchInputVal) {
    // dynamically Update the title based on the search input
    document.getElementById(
      "search-results"
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

        displaySearchResults(data.hits);
      })
      .catch((error) => {
        console.error("Baboon: Problem fetching data", error);
      });
  }
};

//Function 2 - Display results
const displaySearchResults = (data) => {
  for (var i = 0; i < 10; i++) {
    // Assuming 'data' is an array containing objects with a 'result' property
    var lyricContainer = document.querySelector(".lyric-data");

    // Create a new div element for each iteration
    var thumbElement = document.createElement("div");

    // Access the image URL from the 'data' array
    var imageUrl = data.hits[i].result.song_art_image_thumbnail_url;

    // Set the innerHTML of the thumbElement to an img tag with the specified URL
    thumbElement.innerHTML = `<img src='${imageUrl}' alt='Thumbnail Image'>`;

    // Append the thumbElement to the lyricContainer
    lyricContainer.appendChild(thumbElement);
  }
};

// function to make the spotify API call
const spotifyApiCall = (searchInputVal) => {
  // Create the API URL
  const SpotifyApiUrl = `https://spotify23.p.rapidapi.com/search/?q=${encodeURIComponent(
    searchInputVal
  )}&type=tracks&offset=0&limit=1&numberOfTopResults=1`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    },
  };

  // Make fetch request
  fetch(SpotifyApiUrl, options)
    .then((response) => response.json())
    .then((data) => {
      // Display results on the page
      console.log(data);
      createSpotifyLink(data);
    })
    .catch((error) => {
      console.error("Lion: Problem fetching data", error);
    });
};

// Function to create spotify link
const createSpotifyLink = (data) => {
  // Create anchor tag
  const anchorTag = document.createElement("a");

  // Set href attribute
  anchorTag.href = data.tracks.items[0].data.albumOfTrack.sharingInfo.shareUrl;

  // Set text content for the link (you can customize this text)
  anchorTag.textContent = "Spotify Link";

  // Append the anchor tag to the div
  spotifyDivTest.innerHTML = "Link: ";
  spotifyDivTest.appendChild(anchorTag);
};

// function to display spotify results
const displaySpotifyResults = () => {
  if (!searchInputVal) {
    return; // check if there is nothing, else return
  }
  // Call the Api
  spotifyApiCall(searchInputVal);
};

// Call the function getLyricData
getLyricData();

// Event listener for button click to display spotify result
btnTest.addEventListener("click", displaySpotifyResults);
