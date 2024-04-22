// analysis.js
console.log('Script loaded'); //to check whether the script is being loaded
// Exporting functions for use in other modules
export { analyzeAudio };
// Import the function from upload.js to use the audio uploaded by the user
import { uploadAudio } from './upload.js';

// Variable to hold the AudioContext globally to be used for different places
let audioContext;

// Enabling and utilizing WebAudio API
function getAudioContext() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContext;
}

// Function to calculate RMS value from an audio analyser
function calculateRMS(analyser) {
    const dataArray = new Float32Array(analyser.fftSize); // Buffer for waveform data
    analyser.getFloatTimeDomainData(dataArray); // Get waveform data from analyser
    let sum = 0;
    for (let i = 0; i < dataArray.length; i++) {
        sum += dataArray[i] * dataArray[i]; // Square each sample and sum up
    }
    return Math.sqrt(sum / dataArray.length); // Return the square root of the average of squared values
}

// Function to convert RMS to dB
function convertToDb(rmsValue) {
    return 20 * Math.log10(rmsValue);
}

// Reference RMS values for each band
const referenceRMS = {
    low: 0.5, // Reference RMS value for low frequencies
    mid: 0.3, // Reference RMS value for mid frequencies
    high: 0.2 // Reference RMS value for high frequencies
};

// Defining a main (core) function for analysis on the audio
function analyzeAudio(arrayBuffer) {
    const audioCtx = getAudioContext(); // Get an instance of AudioContext
    audioCtx.decodeAudioData(arrayBuffer, (audioBuffer) => {
        const lowPassFilter = audioCtx.createBiquadFilter();
        lowPassFilter.type = 'lowpass';
        lowPassFilter.frequency.value = 250; // Frequency threshold for low-pass

        const highPassFilter = audioCtx.createBiquadFilter();
        highPassFilter.type = 'highpass';
        highPassFilter.frequency.value = 4000; // Frequency threshold for high-pass

        const bandPassFilter = audioCtx.createBiquadFilter();
        bandPassFilter.type = 'bandpass';
        bandPassFilter.frequency.value = 1000; // Center frequency for band-pass
        bandPassFilter.Q.value = 1; // Quality factor for band-pass filter

        const lowAnalyser = audioCtx.createAnalyser();
        const midAnalyser = audioCtx.createAnalyser();
        const highAnalyser = audioCtx.createAnalyser();

        const source = audioCtx.createBufferSource();
        source.buffer = audioBuffer; // Assigning the decoded buffer to source

        source.connect(lowPassFilter).connect(lowAnalyser);
        source.connect(bandPassFilter).connect(midAnalyser);
        source.connect(highPassFilter).connect(highAnalyser);

        source.start(0); // Start processing the audio data

        setTimeout(() => {
            let lowRMS = calculateRMS(lowAnalyser);
            let midRMS = calculateRMS(midAnalyser);
            let highRMS = calculateRMS(highAnalyser);

            let lowDb = convertToDb(lowRMS / referenceRMS.low);
            let midDb = convertToDb(midRMS / referenceRMS.mid);
            let highDb = convertToDb(highRMS / referenceRMS.high);

            // Update the HTML with the results
            document.getElementById('result').textContent = `Adjustments needed - Low: ${lowDb.toFixed(2)} dB, Mid: ${midDb.toFixed(2)} dB, High: ${highDb.toFixed(2)} dB`;
        }, 1000); // Delay to allow time for collecting the data by the analyser
    });
}

// Setup event listeners depending on the document state
if (document.readyState === 'complete' || document.readyState !== 'loading') {
    attachEventListeners();
} else {
    document.addEventListener('DOMContentLoaded', attachEventListeners);
}
// Attach event listeners for HTML elements
function attachEventListeners() {
    const uploadBtn = document.getElementById('uploadButton');
    if (uploadBtn) {
        uploadBtn.addEventListener('click', () => {
            console.log('Button clicked'); // Verify the button click is detected
            const fileInput = document.getElementById('audioFile');
            if (fileInput.files.length > 0) {
                const file = fileInput.files[0];
                uploadAudio(file);
            } else {
                console.log('No file selected');
            }
        });
    }
};


