const fs = require('fs');
const http = require('http');
const path = require('path');

// let appWindow = null;
const appWindow = require(path.join(__dirname, 'window'));

// const privateWindow = require(path.join(__dirname, 'index'));


const fileDetails = new Map();

const videoElement = document.querySelector('video');

const infoButton = document.querySelector('#info')

const stopCapture = document.querySelector('#stopCapture')

infoButton.addEventListener('click', () => addFileDetails())
stopCapture.addEventListener('click', () => capture())

async function startStream() {
    const constraints = {
        audio: false,
        video: {
            mandatory: {
                chromeMediaSource: 'desktop'
            }
        }
    };
    const stream = await navigator.mediaDevices
        .getUserMedia(constraints);
    videoElement.srcObject = stream;
    videoElement.play();


    const options = { mimeType: 'video/webm; codecs=vp9' };
    mediaRecorder = new MediaRecorder(stream, options);

    // mediaRecorder.ondataavailable = handleDataAvailable;
    // mediaRecorder.onstop = handleStop;

}

// app.on('ready',() => {
//     app.on("activate", () => {
//       if (appWindow == null) {
//         appWindow  = require("./index.js");
//       }
//     });
//   });

async function capture() {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    // let browserWindow = appWindow.get();
    
    // console.log(ipcRenderer.sendSync ("show-message"));



console.log(appWindow.get())
console.log(privateWindow)

    try {

        console.log(videoElement.readyState)
        if(videoElement.readyState >1){
            const height = videoElement.videoHeight;
            const width = videoElement.videoWidth;
            canvas.height=height;
            canvas.width=width;
            context.drawImage(videoElement, 0, 0, width, height);
            let e;
            const link = document.createElement('a')
            const date = new Date()
            const fileName = `screen_shot-${date.getFullYear()}-${(date.getMonth() + 1)}-${date.getDate()}-${date.getHours()}_${date.getMinutes()}_${date.getSeconds()}`;
            link.download = fileName;
            // fileDetails.set(fileName, `${date.getFullYear()}-${(date.getMonth() + 1)}-${date.getDate()}-${date.getHours()}${date.getMinutes()}${date.getSeconds()}`);
            link.href = canvas.toDataURL('image/png')
    
            // e = new MouseEvent('click')
            // link.dispatchEvent(e);

        // app.getPath("desktop")       // User's Desktop folder
        // app.getPath("documents")     // User's "My Documents" folder
        // app.getPath("downloads")     // User's Downloads folder

        // const toLocalPath = path.resolve(app.getPath("desktop"), path.basename(link));

        // const userChosenPath = dialog.showSaveDialog({ defaultPath: toLocalPath });

        // if(userChosenPath){
        //     download (remoteUrl, userChosenPath, myUrlSaveAsComplete)
        // }
            }
        } catch (err) {
            console.error("Error: " + err);
        }
};


function download (url, dest, cb) {
    var file = fs.createWriteStream(dest);
    var request = http.get(url, function(response) {
        response.pipe(file);
        file.on('finish', function() {
            file.close(cb); // close() is async, call cb after close completes.
        });
    }).on('error', function(err) { // Handle errors
        fs.unlink(dest); // Delete the file async. (But we don't check the result)
        if (cb) cb(err.message);
    });
};

async function addFileDetails() {
    try {

        console.log(JSON.stringify(fileDetails))
        const details = new JSONObject(fileDetails)

        if (fs.existsSync('details.txt')) {
            fs.appendFile('details.txt', JSON.stringify(details), function (err) {
                if (err) throw err;
            });
        } else {
            fs.writeFile('details.txt', JSON.stringify(details), function (err) {
                if (err) throw err;
            });
        }
    } catch (error) {
        console.error(`Got an error trying to read the file: ${error.message}`);
    }
};



// let startCap = setInterval(() => {
//     capture();
// }, 4000)

function stopCapturing() {
    clearInterval(startCap);
}

(async()=>{
    await startStream();
    // await startCap()
})();

