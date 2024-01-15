document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "128021619emshab73d90a7f58805p108eacjsn084f36f61a53"; // actual RapidAPI key
  const modalWindow = document.querySelector(".modal");
  const modalContent = document.querySelector(".modal-content");
  const errorWindow = document.querySelector(".error-window");
  const songTitle = document.querySelector(".title-song");
  const ThumbnailImage = document.querySelector(".thumbnailImg");
  const searchButtonPage2 = document.querySelector(".search-btn-page-2");
  const bambooBody = document.querySelector(".bamboo-body-bg");
  const nightMd = document.querySelector(".moon");
  const dayMd = document.querySelector(".sun");

  const getArtistData = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchInputVal = urlParams.get("search");

    if (searchInputVal) {
      document.querySelector(
        ".search-results-heading"
      ).innerText = `Search Results for ${searchInputVal}`;

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

      fetch(apiUrl, options)
        .then((response) => response.json())
        .then((data) => {
          displayResults(data.hits);
        })
        .catch((error) => {
          console.error("Baboon: Problem fetching data", error);
        });
    }
  };

  const displayResults = (hits) => {
    for (let i = 0; i < 10; i++) {
      var lyricContainer = document.querySelector(".lyric-data");
      var thumbElement = document.createElement("div");
      thumbElement.classList.add("lyric-card");

      var imageUrl = hits[i].result.song_art_image_thumbnail_url;
      var title = hits[i].result.title;

      thumbElement.innerHTML = `<img src='${imageUrl}' alt='Thumbnail Image'><h4>${title}</h4>`;

      thumbElement.addEventListener("click", () => {
        const clickedTitle = hits[i].result.title;
        songTitle.textContent = clickedTitle;
        getLyrics(hits[i].result.id);
        spotifyApiCall(clickedTitle);
      });

      lyricContainer.appendChild(thumbElement);
      showModalAfterClick(thumbElement);
    }
  };

  const getLyrics = (songId) => {
    const apiUrl = `https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/?id=${songId}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "genius-song-lyrics1.p.rapidapi.com",
      },
    };

    fetch(apiUrl, options)
      .then((response) => response.json())
      .then((data) => {
        console.log("API response for songId", songId, ":", data);
        console.log(data.lyrics);

        if (data?.lyrics?.lyrics?.body?.html) {
          const lyrics = data.lyrics.lyrics.body.html;
          console.log(lyrics);

          const lyricsContent = document.querySelector(".lyric-content");

          console.log(lyricsContent);

          lyricsContent.innerHTML = `<p>${lyrics}</p>`;
        } else {
          console.error("No lyrics found for songId:", songId);
        }
      })
      .catch((error) => {
        console.error("Problem fetching lyrics:", error);
      });
  };

  const spotifyApiCall = (clickedTitle) => {
    const SpotifyApiUrl = `https://spotify23.p.rapidapi.com/search/?q=${encodeURIComponent(
      clickedTitle
    )}&type=tracks&offset=0&limit=1&numberOfTopResults=1`;

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
      },
    };

    fetch(SpotifyApiUrl, options)
      .then((response) => response.json())
      .then((data) => {
        createSpotifyLink(data);
      })
      .catch((error) => {
        console.error("Error: Problem fetching data", error);
      });
  };

  const createSpotifyLink = (data) => {
    const anchorTag = document.createElement("a");

    var songUrl = data.tracks.items[0].data.albumOfTrack.sharingInfo.shareUrl;

    anchorTag.href = songUrl;

    anchorTag.textContent = "Spotify Link";

    const spotifyLinkEl = document.querySelector(".spotify-link");

    spotifyLinkEl.innerHTML = "Link: ";

    spotifyLinkEl.appendChild(anchorTag);
  };

  const showModalAfterClick = function (thumbElement) {
    thumbElement.addEventListener("click", function () {
      modalWindow.style.display = "block";
    });
  };

  searchButtonPage2.addEventListener("click", () => {
    const searchInputVal = document
      .querySelector(".search-Input-page-2")
      .value.trim();

    if (searchInputVal !== "") {
      window.location.href = `search-results.html?search=${encodeURIComponent(
        searchInputVal
      )}`;
    } else {
      console.error("You need a search input value!");
      errorWindow.style.display = "block";
    }
  });

  nightMd.addEventListener("click", function () {
    bambooBody.classList.remove("bg-yellow-50");
    bambooBody.classList.add("bg-stone-900");
    modalContent.classList.remove("bg-yellow-50");
    modalContent.classList.add("bg-stone-900");
    modalContent.style.color = "white";
    document.body.style.color = "white";
    dayMd.style.display = "block";
    nightMd.style.display = "none";
  });

  dayMd.addEventListener("click", function () {
    bambooBody.classList.add("bg-yellow-50");
    bambooBody.classList.remove("bg-stone-900");
    modalContent.classList.add("bg-yellow-50");
    modalContent.classList.remove("bg-stone-900");
    modalContent.style.color = "black";
    document.body.style.color = "black";
    dayMd.style.display = "none";
    nightMd.style.display = "block";
  });

  window.onclick = function (event) {
    if (event.target == modalWindow) {
      modalWindow.style.display = "none";
    }
  };

  getArtistData();
});
