console.log("Spotify Dashboard Loaded");

const song = document.getElementById("song");
const artist = document.getElementById("artist");
const statusText = document.getElementById("status-text");

song.textContent = "Spotify Dashboard";
artist.textContent = "Waiting for Spotify...";
statusText.textContent = "App is running";

const closeButton =
    document.getElementById("close-button");

closeButton.addEventListener("click", () => {
    window.electronAPI.closeWindow();
});