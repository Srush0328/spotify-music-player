const closeButton =
    document.getElementById("close-button");


// Close button
if (closeButton) {

    closeButton.addEventListener(
        "click",
        () => {

            window.electronAPI.closeWindow();

        }
    );

}


// Spotify / Windows media information
window.electronAPI.onMediaUpdate(
    (data) => {

        console.log(
            "MEDIA UPDATE:",
            data
        );

        if (data.type !== "media") {
            return;
        }

        const song =
            document.getElementById("song");

        const artist =
            document.getElementById("artist");

        if (song) {
            song.textContent =
                data.title || "Unknown song";
        }

        if (artist) {
            artist.textContent =
                data.artist || "Unknown artist";
        }

    }
);


console.log(
    "Spotify widget loaded"
);