const searchInput = document.querySelector('.search-Input');
const searchButton = document.querySelector('.search-btn');

searchButton.addEventListener('click', () => {
    const searchInputVal = searchInput.value.trim();

    if (searchInputVal !== '') { // Check if the search input is not empty
        
        // Redirect to the search-results page with the search input value as a parameter
        window.location.href = `search-results.html?search=${encodeURIComponent(searchInputVal)}`;
    } else {
        console.error('You need a search input value!');
        // Optionally, you could display an error message to the user on the current page
    }
});



































