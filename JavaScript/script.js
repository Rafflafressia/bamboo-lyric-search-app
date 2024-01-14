const searchInput = document.querySelector(".search-Input");
const searchButton = document.querySelector(".search-btn");
const modalWindow = document.querySelector(".error-window");

searchButton.addEventListener("click", () => {
  const searchInputVal = searchInput.value.trim();

  if (searchInputVal !== "") {
    // Check if the search input is not empty

    // Redirect to the search-results page with the search input value as a parameter
    window.location.href = `search-results.html?search=${encodeURIComponent(
      searchInputVal
    )}`;
  } else {
    console.error("You need a search input value!");
    // Display an error message to the user on the current page
    modalWindow.style.display = "block";
  }
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modalWindow) {
    modalWindow.style.display = "none";
  }
};
