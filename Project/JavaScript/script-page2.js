// Get the search query from the URL parameters
const urlParams = new URLSearchParams(window.location.search);
const searchInputVal = urlParams.get("search");
const btnTest = document.querySelector(".search-btn-test");

// Arkaw's Code 
var modalTrigger = document.querySelector(".lyric-card");
var modalWindow = document.querySelector(".modal");


const apiKey = "128021619emshab73d90a7f58805p108eacjsn084f36f61a53"; // actual RapidAPI key









// Function to display the lyric search results as Thumbnails
const displaySearchResults = (results) => {
    
  // Selecting the lyric-cards container
  const lyricCardsContainer = document.querySelector('.lyric-cards');

  if (!lyricCardsContainer) {
      console.error('Baboon: Lyric cards container not found.');
      return;
  }

  // Clears the contents before displaying new search results
  lyricCardsContainer.innerHTML = '';

  // Handling no search results
  if (results.length === 0) {
      
      // Create the message element
      const noResultsMessage = document.createElement('p');
      
      // add text content to the element
      noResultsMessage.textContent = 'No results found';
      
      // append the element to the container on the page
      lyricCardsContainer.appendChild(noResultsMessage);
      return;
  }

  // Loops results and creates cards
  for (let i = 0; i < Math.min(results.length, 10); i++) {
      const result = results[i];

      // Creates a card for each of the results
      const card = document.createElement('div');
      card.classList.add('thumbnail-card');

      // Set the inner HTML content of the card
      // button on click calls the getlyircs function and passes the song.id parameter 
      card.innerHTML = `  
          <li class="card">
              <h3>${result.result.title}</h3> 
              <img src='${result.result.song_art_image_thumbnail_url}'>
              <button onclick="getLyrics(${result.result.id})">Get Lyrics</button> 
              <div class="lyrics-container" id="lyrics-${result.result.id}"></div>
          </li>
      `;

      // Append the card to the container
      lyricCardsContainer.appendChild(card);
  }
};



// Function to make Genius Lyrics Api call 
const getLyricData = () => {
    
  // Get the search value from the URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const searchInputVal = urlParams.get('search');

  // Check if searchInputValue exists and make API call if needed
  if (searchInputVal) {

      // dynamically Update the title based on the search input
      document.getElementById('search-results').innerText = `Search Results for ${searchInputVal}`;
      
      // Create the API URL with the search query
      const apiUrl = `https://genius-song-lyrics1.p.rapidapi.com/search/?q=${encodeURIComponent(searchInputVal)}&per_page=10`;
      const options = {
          method: 'GET',
          headers: {
              'X-RapidAPI-Key': apiKey,
              'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com',
          },
      };

      // Make fetch request
      fetch(apiUrl, options)
          .then(response => response.json())
          .then(data => {
              // Display results in console log
              console.log(data);

              displaySearchResults(data.hits);
          })
          .catch(error => {
              console.error('Baboon: Problem fetching data', error);
          });
  }
};




// function to make the spotify API call 
const spotifyApiCall = (searchInputVal) => {
  const SpotifyApiUrl = `https://spotify23.p.rapidapi.com/search/?q=${encodeURIComponent(
    searchInputVal
  )}&type=tracks&offset=0&limit=1&numberOfTopResults=1`;

  console.log(SpotifyApiUrl);

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

