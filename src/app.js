const { desktopCapturer, remote } = require('electron');
const path = require('path')
const util = require(path.join(__dirname, 'preload'));

const videoElement = document.querySelector('video');

const infoButton = document.querySelector('#info')

const stopCapture = document.querySelector('#stopCapture')

infoButton.addEventListener('click', () => addFileDetails())
stopCapture.addEventListener('click', () => stopCapturing())

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
}

async function capture() {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    try {
        if(videoElement.readyState >1){
            const height = videoElement.videoHeight;
            const width = videoElement.videoWidth;
            canvas.height=height;
            canvas.width=width;
            context.drawImage(videoElement, 0, 0, width, height);
            const date = new Date()
            const fileName = `screen_shot-${date.getFullYear()}-${(date.getMonth() + 1)}-${date.getDate()}-${date.getHours()}_${date.getMinutes()}_${date.getSeconds()}`;
            const fileDetails = {
                fileName: fileName,
                creationDateTime:`Date: ${date.getFullYear()}-${(date.getMonth() + 1)}-${date.getDate()} Time:${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
            };
            let url =canvas.toDataURL('image/png');
            util.downloadImage(url,fileName);
            util.addFileDetails(fileDetails);
        }
    } catch (err) {
        console.error("Error: " + err);
    }
};

let startCapIntervalInstance;
function startCap(){
    startCapIntervalInstance = setInterval(() => {
    capture();
}, util.SCREENSHOT_INTERVAL)} //takes screenshot after specified time mentioned in preload.js

function stopCapturing() {
    clearInterval(startCapIntervalInstance);
    stopCapture.setAttribute('disabled',true)
}

(async()=>{
    await startStream();
    await startCap();
})();

