# Screen Recorder
An Electron Application which takes screenshot soon after its launch at every 2 second interval and saves it, and keeps the track of those screenshots in file.

## Task Performs
- As soon as the program runs it starts displaying screen.
- At every 2 second it takes screenshot of the screen and saves it.
- It keeps tracks of all the screenshot in a file with its details.

## To run the application use 
```
npm start
```
**or if using _yarn_**
```
yarn start
```
## Road Map
- [X] Get screen on the application.
- [X] Take screenshot of the shared screen.
- [X] Save it with time and date as name of that screenshot.
- [X] *Try to save it without any popup, as it takes every two seconds, there will be a lot of popups.*
- [X] Try to read/create file and append/write details about the file to it.


## Notes
- **Screenshots will be saved in `screenshot` folder.**
- **Screenshots details will be saved in `screenshot_details.txt` file.**
- **Screenshots will be saved after every 2 seconds.**

**_All above details can be alterd in preload.js_**
