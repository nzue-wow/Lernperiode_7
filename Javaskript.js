// Javaskript.js

// ----- SMALL HEADER ANIMATION -----
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header h1");
  header.style.opacity = 0;
  header.style.transform = "translateY(-20px)";
  header.style.transition = "all 1s ease";

  setTimeout(() => {
    header.style.opacity = 1;
    header.style.transform = "translateY(0)";
  }, 200);
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
});
