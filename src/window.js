// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const {BrowserWindow} = require('electron');
const path = require('path');

let appWindow=null;

function create() {
    appWindow = new BrowserWindow({
        x: 0,
        y: 0,
        width: 1000,
        height: 800,
        show: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    appWindow.loadFile(path.join(__dirname,'index.html'))
        .then(() => { appWindow.show(); });

    appWindow.webContents.openDevTools();
debugger;
    return appWindow; // Return the instance of the appWindow
}


function get() {
    return appWindow;

}

// Export the publicly available functions.
module.exports = {create, get};
