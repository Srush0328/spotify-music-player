const {
    app,
    BrowserWindow,
    ipcMain
} = require("electron");

const path = require("path");

function createWindow() {
    const window = new BrowserWindow({
        width: 360,
        height: 500,

        resizable: false,
        maximizable: false,
        minimizable: false,

        frame: false,
        alwaysOnTop: true,

        backgroundColor: "#121212",

        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    });

    window.loadFile("index.html");
}

ipcMain.on("close-window", () => {
    const window = BrowserWindow.getFocusedWindow();

    if (window) {
        window.close();
    }
});

app.whenReady().then(() => {
    createWindow();
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});