const audioInput= input;

const high = {
    audioInput.BiquadFilterNode;
    BiquadFilterNode.frequency = 70
    BiquadFilterNode.gain = 10
    BiquadFilterNode.type = "highpass"
};
const low = {
    audioInput.BiquadFilterNode;
    BiquadFilterNode.frequency = 2000
    BiquadFilterNode.gain = 10
    BiquadFilterNode.type = "lowpass"
};
const mid = {
    audioInput.BiquadFilterNode;
    BiquadFilterNode.frequency = 30
    BiquadFilterNode.gain = 10
    BiquadFilterNode.type = "bandpass"};

const referenceRatio = {
    let referenceHigh
    let referenceLow
    let referenceMid
};
let highRms = high.rms
let lowRms = low.rms
let midRms = mid.rms
let normalizedRmsHigh = highRms/100;
let normalizedRmsLow = lowRms/100;
let normalizedRmsmid = midRms/100;

const dBNormalization;
const normalizedByDB = {
let highDB = normalizedRmsHigh/dBNormalization;
let lowDB = normalizedRmsLow/dBNormalization;
let midDB = normalizedRmsmid/dBNormalization;
};


const comparedRatio = {
   let differenceHigh = highDB -  referenceHigh
   let differencelow = lowDB - referenceLow
   let differenceMid = midDB - referenceMid
};

const output = {
    let highResult = {
        if highDB > referenceHigh console.log (`you have to attenuate your high range by ${differenceHigh}`);
        if highDB < referenceHigh console.log (`you have to amplify your high range by ${differenceHigh}`);
    };
    let lowResult = {
        if lowDB > referenceLow console.log (`you have to attenuate your low range by ${differencelow}`);
        if lowDB < referenceLow console.log (`you have to amplify your low range by ${differencelow}`);
    };
    let midResult = {
        if midDB > referenceMid console.log (`you have to attenuate your mid range by ${differenceMid}`);
        if midDB < referenceMid console.log (`you have to amplify your mid range by ${differenceMid}`);
    };
};

