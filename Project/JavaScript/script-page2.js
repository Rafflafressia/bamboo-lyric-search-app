const apiKey = "151d327872msh78dcc08290906e3p19a183jsn27d336971c75"; // actual RapidAPI key
const appendSpotifyData = document.querySelector(".album-art");
const btnTest = document.querySelector(".search-btn-test");
const modalTrigger = document.querySelector(".lyric-card");
const modalWindow = document.querySelector(".modal");
// Get the search value from the URL parameters
const urlParams = new URLSearchParams(window.location.search);
const searchInputVal = urlParams.get("search"); // <-- First declaration
// When user clicks on one of the thumnails/card I need to grab the value of the respective card then replace the "searchInputVal"
// with the value i grabbed in order for the spotifi call to truly work.
// After so, i need to append the link into the modal as " link: Spotify Link"

// Function to make Genius Lyrics Api call
const getLyricData = () => {
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

        //Calls Display Thumbnails function
        // displaySearchResults(data.hits);
      })
      .catch((error) => {
        console.error("Baboon: Problem fetching data", error);
      });
  }
};

// function to make the spotify API call
const spotifyApiCall = () => {
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
      console.error("Idiot: Problem fetching data", error);
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
  // spotifyDivTest.innerHTML = "Link: ";
  // spotifyDivTest.appendChild(anchorTag);
};

// function to display spotify results
const displaySpotifyResults = () => {
  if (!searchInputVal) {
    return; // check if there is nothing, else return
  }
  // Call the Api
  spotifyApiCall(searchInputVal);
};

// Event listener for button click to display spotify result
// btnTest.addEventListener("click", displaySpotifyResults);

// On Click Event listener for modal boxes that are generated by the search results
modalTrigger.addEventListener("click", function () {
  modalWindow.style.display = "block";
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modalWindow) {
    modalWindow.style.display = "none";
  }
};

// Call the function getLyricData
getLyricData();
