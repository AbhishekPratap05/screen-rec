// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const fs = require('fs')
const {join}  = require('path')


const SCREEN_SHOT_SAVE_FOLDER_NAME = './screenshot';
const DOWNLOAD_DETAILS_FILE_NAME = 'screenshot_details.txt';
const SCREENSHOT_INTERVAL= 2000;

async function downloadImage(dataURL,filename){
    const base64Data = dataURL.replace(/^data:image\/png;base64,/, "");
    if (!fs.existsSync(SCREEN_SHOT_SAVE_FOLDER_NAME)){    //check if folder already exists
        fs.mkdirSync(SCREEN_SHOT_SAVE_FOLDER_NAME);    //creating folder
    }
    fs.writeFile(join(SCREEN_SHOT_SAVE_FOLDER_NAME,filename+'.png'), base64Data, 'base64', (err) => {
        if (err) throw err;
    });
}

async function addFileDetails(fileDetails) {
    try {
        if (fs.existsSync(DOWNLOAD_DETAILS_FILE_NAME)) {
            fs.appendFile(DOWNLOAD_DETAILS_FILE_NAME, `\n${JSON.stringify(fileDetails)}`, function (err) {
                if (err) throw err;
            });
        } else {
            fs.writeFile(DOWNLOAD_DETAILS_FILE_NAME, JSON.stringify(fileDetails), function (err) {
                if (err) throw err;
            });
        }
    } catch (error) {
        console.error(`Got an error trying to read the file: ${error.message}`);
    }
};

module.exports = {downloadImage,addFileDetails,SCREENSHOT_INTERVAL}