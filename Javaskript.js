// ----- SMALL HEADER ANIMATION -----
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header h1");
  header.style.opacity = 0;
  header.style.transform = "translateY(-20px)";
  header.style.transition = "all 1s ease";
  loadLastSearches();

  setTimeout(() => {
    header.style.opacity = 1;
    header.style.transform = "translateY(0)";
  }, 300);

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
  saveLastSearch(artist, song);

  if (!artist || !song) {
    alert("Bitte gib sowohl Künstler als auch Songtitel ein!");
    return;
  }

  const url = `https://api.lyrics.ovh/v1/${artist}/${song}`;
  lyricsBox.textContent = "Lade Liedtext...";

  try {
    const response = await fetch(url);

    if (!response.ok) throw new Error("Fehler beim Abrufen der Daten");

    const data = await response.json();

    if (data.lyrics) {
      titleEl.textContent = song;
      artistEl.textContent = artist;

      // ---- Improve lyrics readability ----
      lyricsBox.textContent = data.lyrics
        .replace(/\n\n+/g, "\n\n")   // Doppelte Leerzeilen normieren
        .replace(/\r/g, "");         // Carriage return entfernen

    } else {
      lyricsBox.textContent = "Keine Lyrics gefunden.";
    }
  } catch (error) {
    lyricsBox.textContent = "Fehler beim Abrufen der Lyrics.";
    console.error(error);
  }
});

// ----- COPY BUTTON -----
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
    alert("Copy failed.");
  }
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

  // ---- LIMIT FAVORITES ----
  if (favorites.length >= 5) {
    alert("Du kannst maximal 5 Favoriten speichern!");
    return;
  }

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

// ----- LOAD FAVORITES WITH DELETE BUTTON -----
function loadFavorites() {
  const favList = document.querySelector(".favorites ul");
  favList.innerHTML = "";
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  favorites.forEach(fav => {
    const li = document.createElement("li");

    const textSpan = document.createElement("span");
    textSpan.textContent = fav;
    textSpan.style.cursor = "pointer";

    // Click: load song
    textSpan.addEventListener("click", () => {
      const [song, artist] = parseFavorite(fav);
      loadLyrics(artist, song);
    });

    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.style.marginLeft = "10px";
    delBtn.style.background = "transparent";
    delBtn.style.border = "none";
    delBtn.style.cursor = "pointer";
    delBtn.style.color = "#ff8080";
    delBtn.style.fontSize = "1rem";

    // Delete click
    delBtn.addEventListener("click", () => {
      const updated = favorites.filter(item => item !== fav);
      localStorage.setItem("favorites", JSON.stringify(updated));
      loadFavorites();
    });

    li.appendChild(textSpan);
    li.appendChild(delBtn);
    favList.appendChild(li);
  });
}

function parseFavorite(favString) {
  const parts = favString.split(" – ");
  const song = parts[0].replace(/"/g, "");
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

      lyricsBox.textContent = data.lyrics
        .replace(/\n\n+/g, "\n\n")
        .replace(/\r/g, "");

    } else {
      lyricsBox.textContent = "No lyrics found.";
    }
  } catch (error) {
    lyricsBox.textContent = "Error loading lyrics.";
  }
}

// share button
document.getElementById("shareBtn").addEventListener("click", () => {
  const title = document.getElementById("song-title").textContent;
  const artist = document.getElementById("artist-name").textContent;
  const lyrics = document.getElementById("lyrics").textContent.trim();

  if (!lyrics || lyrics === "Your lyrics will appear here...") {
    alert("Nothing to share!");
    return;
  }

  const fullText = `${title} — ${artist}\n\n${lyrics}`;

  // --- Try Web Share API ---
  if (navigator.share) {
    navigator.share({
      title: `${title} — ${artist}`,
      text: fullText
    });
    return;
  }

  // --- WhatsApp Fallback ---
  const whatsAppLink = `https://wa.me/?text=${encodeURIComponent(fullText)}`;
  window.open(whatsAppLink, "_blank");

  // download as text file
  const blob = new Blob([fullText], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${title}-lyrics.txt`;
  a.click();
});

// ----- LAST SEARCHES SYSTEM -----
function saveLastSearch(artist, song) {
  const list = JSON.parse(localStorage.getItem("lastSearches")) || [];

  const newEntry = { artist, song };

  // Avoid duplicates
  const filtered = list.filter(item => !(item.artist === artist && item.song === song));

  filtered.unshift(newEntry); // Add to top

  // Limit to 5
  const trimmed = filtered.slice(0, 5);

  localStorage.setItem("lastSearches", JSON.stringify(trimmed));
  loadLastSearches();
}

function loadLastSearches() {
  const trendingList = document.querySelector(".trending ul");
  const searches = JSON.parse(localStorage.getItem("lastSearches")) || [];

  trendingList.innerHTML = ""; 

  searches.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.artist} - ${item.song}`;
    li.style.cursor = "pointer";

    li.addEventListener("click", () => {
      loadLyrics(item.artist, item.song);
    });

    trendingList.appendChild(li);
  });
}
