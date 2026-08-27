const {
    app,
    BrowserWindow,
    ipcMain
} = require("electron");

const {
    Worker
} = require("worker_threads");

const path = require("path");

let mainWindow;
let mediaWorker;


// ─────────────────────────────────────────────
// Create widget
// ─────────────────────────────────────────────

function createWindow() {

    mainWindow = new BrowserWindow({
        width: 360,
        height: 500,

        resizable: false,
        maximizable: false,
        minimizable: false,

        frame: false,
        alwaysOnTop: true,

        backgroundColor: "#121212",

        webPreferences: {
            preload: path.join(
                __dirname,
                "preload.js"
            ),

            contextIsolation: true,
            nodeIntegration: false
        }
    });

    mainWindow.loadFile("index.html");

    mainWindow.on("closed", () => {
        mainWindow = null;
    });
}


// ─────────────────────────────────────────────
// Start Windows media monitor
// ─────────────────────────────────────────────

function startMediaWorker() {

    mediaWorker = new Worker(
        path.join(
            __dirname,
            "media-worker.js"
        )
    );

    mediaWorker.on("message", (message) => {

        console.log(
            "Media worker:",
            message
        );

        if (!mainWindow) {
            return;
        }

        // Send media information to renderer
        mainWindow.webContents.send(
            "media-update",
            message
        );
    });

    mediaWorker.on("error", (error) => {

        console.error(
            "Media worker error:",
            error
        );

    });

    mediaWorker.on("exit", (code) => {

        console.log(
            "Media worker exited:",
            code
        );

    });
}


// ─────────────────────────────────────────────
// Close widget
// ─────────────────────────────────────────────

ipcMain.on(
    "close-window",
    () => {

        if (mainWindow) {
            mainWindow.close();
        }

    }
);


// ─────────────────────────────────────────────
// Start Electron
// ─────────────────────────────────────────────

app.whenReady().then(() => {

    createWindow();

    startMediaWorker();

});


// ─────────────────────────────────────────────
// Quit
// ─────────────────────────────────────────────

app.on(
    "window-all-closed",
    () => {

        if (mediaWorker) {
            mediaWorker.terminate();
        }

        app.quit();

    }
);