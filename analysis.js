// analysis.js
// Import the function from upload.js to use the audio uploaded by the user
import { uploadAudio } from './upload.js';

//Variable to hold the AudioContext globally to be used for different places
let audioContext;

//Enabling and utilizing WebAudio API
function getAudioContext() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContext;
}

//Defining a main (core) function for analysis on the audio
function analyzeAudio(arrayBuffer) {
    const audioCtx = getAudioContext(); // Get an instance of AudioContext

    // Decoding the ArrayBuffer into an AudioBuffer (developed by GPT)
    audioCtx.decodeAudioData(arrayBuffer, (audioBuffer) => {
        // Creating filters using WebAudio API for different frequency bands through which the audio will go
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

        // Creating AnalyserNodes for real-time frequency and time-domain analysis (FFT) for each frequency band
        const lowAnalyser = audioCtx.createAnalyser();
        const midAnalyser = audioCtx.createAnalyser();
        const highAnalyser = audioCtx.createAnalyser();

        const source = audioCtx.createBufferSource();
        source.buffer = audioBuffer; // Assigning the decoded buffer to source (develope by GPT)

        // Connecting the audio source to filters and then to the analysers
        source.connect(lowPassFilter);
        lowPassFilter.connect(lowAnalyser);

        source.connect(bandPassFilter);
        bandPassFilter.connect(midAnalyser);

        source.connect(highPassFilter);
        highPassFilter.connect(highAnalyser);

        source.start(0); // Start processing the audio data

        // Delay the RMS calculation to allow time for collecting the data by the analyzer before calculating RMS and avoiding errors (suggested by GPT)

        setTimeout(() => {
            const lowRMS = calculateRMS(lowAnalyser);
            const midRMS = calculateRMS(midAnalyser);
            const highRMS = calculateRMS(highAnalyser);

            // Converting RMS values to dB (developed by GPT)
            const lowdB = 20 * Math.log10(lowRMS);
            const middB = 20 * Math.log10(midRMS);
            const highdB = 20 * Math.log10(highRMS);

            console.log(`Low dB: ${lowdB.toFixed(2)}, Mid dB: ${middB.toFixed(2)}, High dB: ${highdB.toFixed(2)}`);
        }, 1000);
    }, (error) => {
        console.error('Error decoding audio data:', error);
    });
}

// Function to calculate the RMS value from an audio analyser
function calculateRMS(analyser) {
    const dataArray = new Float32Array(analyser.fftSize); // Buffer for waveform data
    analyser.getFloatTimeDomainData(dataArray); // Get waveform data from analyser
    let sum = 0;
    for (let i = 0; i < dataArray.length; i++) {
        sum += dataArray[i] * dataArray[i]; // Square each sample and sum up
    }
    return Math.sqrt(sum / dataArray.length); // Return the square root of the average of squared values
}

// Setup event listeners depending on the document state
if (document.readyState === 'complete' || document.readyState !== 'loading') {
    attachEventListeners();
} else {
    document.addEventListener('DOMContentLoaded', attachEventListeners);
}

// Exporting functions for use in other modules
export { analyzeAudio, uploadAudio };

// Attach event listeners for HTML elements
function attachEventListeners() {
    const uploadBtn = document.getElementById('uploadButton');
    if (uploadBtn) {
        uploadBtn.addEventListener('click', () => {
            const fileInput = document.getElementById('audioFile');
            if (fileInput.files.length > 0) {
                const file = fileInput.files[0];
                uploadAudio(file);
            } else {
                console.log('No file selected');
            }
        });
    }
}
