// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const fs = require('fs')
const {join}  = require('path')


const SCREEN_SHOT_SAVE_FOLDER_NAME = './screenshot';
const DOWNLOAD_DETAILS_FILE_NAME = 'details.txt'

async function downloadImage(dataURL,filename){
    const base64Data = dataURL.replace(/^data:image\/png;base64,/, "");
    if (!fs.existsSync(SCREEN_SHOT_SAVE_FOLDER_NAME)){    //check if folder already exists
        fs.mkdirSync(SCREEN_SHOT_SAVE_FOLDER_NAME);    //creating folder
    }
    fs.writeFile(join(SCREEN_SHOT_SAVE_FOLDER_NAME,filename+'.png'), base64Data, 'base64', (err) => {
        if (err) throw err;
    });
}

async function addFileDetails(filename,fileDetails) {
    try {
        // const details = new JSONObject(fileDetails)
        console.log(filename,fileDetails);
        // if (fs.existsSync(DOWNLOAD_DETAILS_FILE_NAME)) {
        //     fs.appendFile(DOWNLOAD_DETAILS_FILE_NAME, JSON.stringify(details), function (err) {
        //         if (err) throw err;
        //     });
        // } else {
        //     fs.writeFile(DOWNLOAD_DETAILS_FILE_NAME, JSON.stringify(details), function (err) {
        //         if (err) throw err;
        //     });
        // }
    } catch (error) {
        console.error(`Got an error trying to read the file: ${error.message}`);
    }
};

module.exports = {downloadImage,addFileDetails}