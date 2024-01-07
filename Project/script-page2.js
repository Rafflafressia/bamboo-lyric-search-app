
const apiKey = 'f3045d751bmsh1fa0584fb3bcd9cp181d58jsnec9f72b14b11'; // actual RapidAPI key

const getLyricData = () => {
    
    // Get the search value from the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const searchInputVal = urlParams.get('search');

    // Check if searchInputValue exists and make API call if needed
    if (searchInputVal) {
        
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
            .then(response => response.json()).then(data => {
                
                // Display results in console log
                console.log(data);
            })
            .catch(error => {
                console.error('Baboon: Problem fetching data', error);
            });
    }
};

// Call the function getLyricData
getLyricData();






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
