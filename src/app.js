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
            link.href = canvas.toDataURL('image/png');
            let url =canvas.toDataURL('image/png');


            const base64Data = url.replace(/^data:image\/png;base64,/, "");

            fs.writeFile(fileName+'.png', base64Data, 'base64', (err) => {
                    console.log(err);
            });

            // canvas.toBlob((blob) => {
            //     const newImg = document.createElement('img');
            //     url = URL.createObjectURL(blob);
              
            //     newImg.onload = () => {
            //       // no longer need to read the blob so it's revoked
            //       URL.revokeObjectURL(url);
            //     };
              
            //     newImg.src = url;
            //     console.log(newImg,url)
            //     downloadScreenShot(url,fileName)
            // })
    


            // e = new MouseEvent('click')
            // link.dispatchEvent(e);

        }
    } catch (err) {
        console.error("Error: " + err);
    }
};

// async function downloadScreenShot(url,fileName) {
//     console.log(url)
//     const lll = URL.createObjectURL(url)
//     console.log(lll)
//     await download(lll, `${__dirname}/screenshot/`);
 
//     // fs.writeFileSync('dist/foo.jpg', await download('http://unicorn.com/foo.jpg'));
 
//     // download('unicorn.com/foo.jpg').pipe(fs.createWriteStream('dist/foo.jpg'));
 
//     // await Promise.all([
//     //     'unicorn.com/foo.jpg',
//     //     'cats.com/dancing.gif'
//     // ].map(url => download(url, 'dist')));


//     // https.get(url,(res) => {
//     //         const path = `${__dirname}/screenshot/${fileName}`; 
//     //         const filePath = fs.createWriteStream(path);
//     //         res.pipe(filePath);
//     //         filePath.on('finish',() => {
//     //             filePath.close();
//     //             console.log('Download Completed'); 
//     //         })
//     // });
// }
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

