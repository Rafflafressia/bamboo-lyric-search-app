// Get the search query from the URL parameters
const urlParams = new URLSearchParams(window.location.search);
const searchInputVal = urlParams.get("search");
const btnTest = document.querySelector(".search-btn-test");

const apiKey = "f84cfa881cmshb8d5f3faf7b9c6dp1d4be8jsna4967ff68e8a"; // actual RapidAPI key

// Check if searchQuery exists and make API call if needed
if (searchInputVal) {
  // Create the API URL with the search query
  const apiUrl = `https://genius-song-lyrics1.p.rapidapi.com/search/?q=${encodeURIComponent(
    searchInputVal
  )}&per_page=50`;
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
      // Display results on the page
      console.log(data);
    })
    .catch((error) => {
      console.error("Baboon: Problem fetching data", error);
    });
}

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
      displaySpotifyItems(data);
      createSpotifyLink(data);
    })
    .catch((error) => {
      console.error("Lion: Problem fetching data", error);
    });
};

const displaySpotifyResults = () => {
  if (!searchInputVal) {
    return; // check if there is nothing, else return
  }
  spotifyApiCall(searchInputVal);
};

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

btnTest.addEventListener("click", displaySpotifyResults);
/* 

Page 1
a) User entered the name of artist or song title. On button press user will be taken to page 2. 

Page 2 
b) User is taken to a page where the songs are presented as a list of 2 rows with 4 thumbnail items in each row
c) on click of a thumbnail the screen will scroll down to the lyrics at the bottom of the page , the user can scroll up as well.  
d) back to top button can we clicked


Page 1 Code

Html will have search bar and button as well as a class for each element  

Javascript will connect the search bar and button to the html 
we will also grab the search parameter in global scope. 


Page 2 code 
Function 1 ) Access the searchQuery from page 1 and use it as a parameter to Grabs artist information from the API 


Function 2)  Display Artist songs as Cards [limit to 8]
        
        i) Display "Results for artist" at the top of the page 

        ii) creating a loop to display the artist songs in array of [8]
            -Create html element 
            -Add content to the html element
            -Append to the html element 
        
        iii) Display as thumbnail images 

        iv) On click of the thumbnail , the page will scroll down to where the lyrics will be displayed 
            i) on click call Youtube function
        
Function 3)  api call is made to YOUTUBE that passes the song name parameter and produces song link
            I) Displays song link under lyrics ** (positioning can be AGILE)

        
        v) Sticky button to bring user back to the top****  

*/
