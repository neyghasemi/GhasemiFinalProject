// upload.js

//// Import the analyzeAudio function to process the uploaded audio (due to an error that will otherwise occur)
import { analyzeAudio } from './analysis.js';

// Function to handle the file upload and capture/store the file that user uploads
function uploadAudio(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const arrayBuffer = e.target.result;
        analyzeAudio(arrayBuffer);
    };
    reader.readAsArrayBuffer(file);
}

export { uploadAudio };
