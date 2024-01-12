// Get the search query from the URL parameters
const urlParams = new URLSearchParams(window.location.search);
const searchInputVal = urlParams.get("search");
const btnTest = document.querySelector(".search-btn-test");
const modalTrigger = document.querySelector(".lyric-card");
const modalWindow = document.querySelector(".modal");

const apiKey = "128021619emshab73d90a7f58805p108eacjsn084f36f61a53"; // actual RapidAPI key

// Function to make Genius Lyrics Api call
const getLyricData = () => {
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

        for (var i = 0; i < 10; i++) {
          // Assuming 'data' is an array containing objects with a 'result' property
          var lyricContainer = document.querySelector(".lyric-data");

          // Create a new div element for each iteration
          var thumbElement = document.createElement("div");

          // Access the image URL from the 'data' array
          var imageUrl = data.hits[i].result.song_art_image_thumbnail_url;
          var title = data.hits[i].result.title;
          console.log(title);

          // Set the innerHTML of the thumbElement to an img tag with the specified URL
          thumbElement.innerHTML = `<img src='${imageUrl}' alt='Thumbnail Image'><h4 style="color:#99CC66">${title}</h4> `;

          // Append the thumbElement to the lyricContainer
          lyricContainer.appendChild(thumbElement);
        }

        //Calls Display Thumbnails function
        // displaySearchResults(data.hits);
        // *****CALL THE getLyrics Function run the ${result.result.id} as a parameter *****
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
      method: 'GET',
      headers: {
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com',
    },
  
  };

  // Make the fetch request
  fetch(apiUrl, options)
      .then(response => response.json()).then(data => {
        
        //Display Api response once songId is run as parameter
        console.log('API response for songId', songId, ':', data);
        console.log(data.lyrics);
        // Check if pathway and its steps exists. Uses optional chaining for nested objects, it checks each step and will return null if one pathway does not exist.
        // efficient check to make sure pathways are present and if not we know where to look for issues.
        if (data?.lyrics?.lyrics?.body?.html) {
       
        // Get the lyrics content
        const lyrics = data.lyrics.lyrics.body.html;
        console.log(lyrics);

        // Get the lyrics container
        const lyricsContainer = document.getElementById('lyrics-container');

        console.log(lyricsContainer);

        // Set the HTML content into <p> tags, prints lyrics to page 
        lyricsContainer.innerHTML = `<p>${lyrics}</p>`;  
        // Error message incase the lyrics arent found
      } else {
        console.error('No lyrics found for songId:', songId);
      }
    })
    .catch(error => {
      console.error('Problem fetching lyrics:', error);
    });
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

// Event listener for button click to display spotify result
// btnTest.addEventListener("click", displaySpotifyResults);

// Call the function getLyricData
getLyricData();

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
