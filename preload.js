const {
    contextBridge,
    ipcRenderer
} = require("electron");

contextBridge.exposeInMainWorld(
    "electronAPI",
    {

        closeWindow: () => {
            ipcRenderer.send("close-window");
        },

        onMediaUpdate: (callback) => {

            ipcRenderer.on(
                "media-update",
                (event, data) => {

                    callback(data);

                }
            );

        }

    }
);