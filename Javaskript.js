// ----- SMALL HEADER ANIMATION -----
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header h1");
  header.style.opacity = 0;
  header.style.transform = "translateY(-20px)";
  header.style.transition = "all 1s ease";

  setTimeout(() => {
    header.style.opacity = 1;
    header.style.transform = "translateY(0)";
  }, 300);

  // Load favorites on page load
  loadFavorites();
}); 

// ----- SEARCH BUTTON + API CALL -----
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", async () => {
  const artist = document.getElementById("artist").value.trim();
  const song = document.getElementById("song").value.trim();
  const lyricsBox = document.getElementById("lyrics");
  const titleEl = document.getElementById("song-title");
  const artistEl = document.getElementById("artist-name");

  if (!artist || !song) {
    alert("Bitte gib sowohl Künstler als auch Songtitel ein!");
    return;
  }

  const url = `https://api.lyrics.ovh/v1/${artist}/${song}`;
  lyricsBox.textContent = "Lade Liedtext...";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Fehler beim Abrufen der Daten");
    }

    const data = await response.json();

    if (data.lyrics) {
      titleEl.textContent = song;
      artistEl.textContent = artist;
      lyricsBox.textContent = data.lyrics;
    } else {
      lyricsBox.textContent = "Keine Lyrics gefunden.";
    }
  } catch (error) {
    lyricsBox.textContent = "Fehler beim Abrufen der Lyrics.";
    console.error(error);
  }

  // Copy Lyrics Button
  document.getElementById("copyBtn").addEventListener("click", async () => {
    const lyrics = document.getElementById("lyrics").textContent.trim();
    if (!lyrics || lyrics === "Your lyrics will appear here...") {
      alert("No lyrics to copy!");
      return;
    }

    try {
      await navigator.clipboard.writeText(lyrics);
      alert("Lyrics copied!");
    } catch (err) {
      console.error("Clipboard error:", err);
      alert("Copy failed. Try running this page through a local server.");
    }
  });
});

// ----- FAVORITES SYSTEM -----
const favBtn = document.getElementById("favBtn");

favBtn.addEventListener("click", () => {
  const song = document.getElementById("song-title").textContent;
  const artist = document.getElementById("artist-name").textContent;

  if (!song || song === "Song Title") {
    alert("Search a song first!");
    return;
  }

  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const newFav = `"${song}" – ${artist}`;

  if (!favorites.includes(newFav)) {
    favorites.push(newFav);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    loadFavorites();
    alert("Added to favorites!");
  } else {
    alert("Already in favorites!");
  }
});

// ----- LOAD FAVORITES -----
function loadFavorites() {
  const favList = document.querySelector(".favorites ul");
  favList.innerHTML = "";
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  favorites.forEach(fav => {
    const li = document.createElement("li");
    li.textContent = fav;
    li.style.cursor = "pointer";

    // Click event to reload the song
    li.addEventListener("click", () => {
      const [song, artist] = parseFavorite(fav);
      loadLyrics(artist, song);
    });

    favList.appendChild(li);
  });
}
function parseFavorite(favString) {
  // fav format:  "Song Title" – Artist Name
  const parts = favString.split(" – ");
  const song = parts[0].replace(/"/g, "");   // remove quotes
  const artist = parts[1];
  return [song, artist];
}
async function loadLyrics(artist, song) {
  const lyricsBox = document.getElementById("lyrics");
  const titleEl = document.getElementById("song-title");
  const artistEl = document.getElementById("artist-name");

  lyricsBox.textContent = "Loading lyrics...";

  try {
    const response = await fetch(`https://api.lyrics.ovh/v1/${artist}/${song}`);
    const data = await response.json();

    if (data.lyrics) {
      titleEl.textContent = song;
      artistEl.textContent = artist;
      lyricsBox.textContent = data.lyrics;
    } else {
      lyricsBox.textContent = "No lyrics found.";
    }
  } catch (error) {
    lyricsBox.textContent = "Error loading lyrics.";
  }
}


