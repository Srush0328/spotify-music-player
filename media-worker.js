const { parentPort } = require("worker_threads");

const SMTCMonitor = require(
    "@coooookies/windows-smtc-monitor"
);

const monitor = new SMTCMonitor();

monitor.on("session-media-changed", (appId, media) => {
    parentPort.postMessage({
        type: "media",
        appId,
        title: media.title,
        artist: media.artist,
        album: media.albumTitle,
        artwork: media.thumbnail
    });
});

monitor.on("session-playback-changed", (appId, playback) => {
    parentPort.postMessage({
        type: "playback",
        appId,
        playback
    });
});

monitor.start();

parentPort.postMessage({
    type: "ready"
});