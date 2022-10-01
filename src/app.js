const { desktopCapturer, remote } = require('electron');

const fs = require('fs');

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

async function capture() {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
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
    
            e = new MouseEvent('click')
            link.dispatchEvent(e);
        }

        // img.onload=()=>{
        //     canvas.width = img.width;
        //     canvas.height = img.height;
        //     setImaProperties({width:img.width,height:img.height});
        //     ctx.drawImage(img,0,0, img.width,img.height);
        //     canvas.removeAttribute('data-caman-id');
        // };
        // img.crossOrigin = 'Anonymous';
        // img.src=url;

        // stream.getTracks().forEach(track => track.stop());
        // window.location.href = frame;
        // const blob = new Blob(frame, {
        //     type: 'image/png'
        //   });

        //   const buffer = Buffer.from(await blob.arrayBuffer());

        //   const { filePath } = await dialog.showSaveDialog({
        //     buttonLabel: 'Save video',
        //     defaultPath: `vid-${Date.now()}.webm`
        //   });

        //   if (filePath) {
        //     writeFile(filePath, buffer, () => console.log('video saved successfully!'));
        //   }
    } catch (err) {
        console.error("Error: " + err);
    }
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

