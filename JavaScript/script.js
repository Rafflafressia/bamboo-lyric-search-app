const searchInput = document.querySelector(".search-Input");
const searchButton = document.querySelector(".search-btn");
const modalWindow = document.querySelector(".error-window");
const resetButton = document.querySelector('.reset-btn')

searchButton.addEventListener("click", () => {
  const searchInputVal = searchInput.value.trim();

  if (searchInputVal !== "") {
    // Check if the search input is not empty

    // Redirect to the search-results page with the search input value as a parameter
    window.location.href = `search-results.html?search=${encodeURIComponent(searchInputVal)}`;

    // Save the search input to local storage 
    localStorage.setItem('lastSearchVal', searchInputVal);
    

  } else {
    console.error("You need a search input value!");
    // Display an error message to the user on the current page
    modalWindow.style.display = "block";
  }
});


// Function clear search Inputs from Local Storage
function clearSearchInput() {
  
    
    // Clears the last search value from local storage 
    localStorage.removeItem('lastSearchVal');

  }

// when page loads, grab the searchvalue from local storage and put into search field
document.addEventListener('DOMContentLoaded', function() {

      // Grabs the lastsearchVal 
      const savedSearchVal = localStorage.getItem('lastSearchVal');

      // Checks if there is a savedSearchValue and if there is...
      if (savedSearchVal) {

        //Puts last search value back into the search field
        searchInput.value = savedSearchVal; 

      }

  })

// event listener for the reset button for search bar
resetButton.addEventListener('click', () => {

    searchInput.value = '';//Empties the search field
    clearSearchInput(); // Calls the clearSearchInput function which clears the input from Local Storage
  


})




// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modalWindow) {
    modalWindow.style.display = "none";
  }
};

