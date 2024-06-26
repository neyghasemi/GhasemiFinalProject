// Enable WebMidi API and handle any errors if it fails to enable.
// This is necessary to work with MIDI devices in the web browser.
await WebMidi.enable();

//set the transposition value
let transposition = 12;

// Initialize variables to store the first MIDI input and output devices detected.
// These devices can be used to send or receive MIDI messages.
let myInput = WebMidi.inputs[0];
let myOutput = WebMidi.outputs[0].channels[1];

// Get the dropdown elements from the HTML document by their IDs.
// These dropdowns will be used to display the MIDI input and output devices available.
let dropIns = document.getElementById("dropdown-ins");
let dropOuts = document.getElementById("dropdown-outs");
let slider = document.getElementById("slide");
slider.addEventListener("change", function(){
document.getElementById ("transpoAmt").innerText = `${slider.value} semitones`;
});

// For each MIDI input device detected, add an option to the input devices dropdown.
// This loop iterates over all detected input devices, adding them to the dropdown.
WebMidi.inputs.forEach(function(input, num) {
  dropIns.innerHTML += `<option value=${num}>${input.name}</option>`;
});

// Similarly, for each MIDI output device detected, add an option to the output devices dropdown.
// This loop iterates over all detected output devices, adding them to the dropdown.
WebMidi.outputs.forEach(function(output, num) {
  dropOuts.innerHTML += `<option value=${num}>${output.name}</option>`;
});

//define MIDI processing function
const midiProcess = function(midiNoteInput) {
  let pitch = midiNoteInput.note.number + parseInt (slider.value;
  let velocity = 127;
  let midiNoteOutput = new Note(pitch, {rawAttack: velocity});
  return midiNoteOutput;
};

// Add an event listener for the 'change' event on the input devices dropdown.
// This allows the script to react when the user selects a different MIDI input device.
dropIns.addEventListener("change", function() {
  // Before changing the input device, remove any existing event listeners
  // to prevent them from being called after the device has been changed.
  if (myInput.hasListener("noteon", "all")) {
    myInput.removeListener("noteon", "all");
  }
  if (myInput.hasListener("noteoff", "all")) {
    myInput.removeListener("noteoff", "all");
  }

  // Change the input device based on the user's selection in the dropdown.
  myInput = WebMidi.inputs[this.value];

  // After changing the input device, add new listeners for 'noteon' and 'noteoff' events.
  // These listeners will handle MIDI note on (key press) and note off (key release) messages.
  myInput.addListener("noteon", "all", function(someMIDI) {
    // When a note on event is received, send a note on message to the output device.
    // This can trigger a sound or action on the MIDI output device.
    myOutput.sendNoteOn(midiProcess(someMIDI));
  });

  myInput.addListener("noteoff", "all", function(someMIDI) {
    // Similarly, when a note off event is received, send a note off message to the output device.
    // This signals the end of a note being played.
    myOutput.sendNoteOff(midiProcess(someMIDI));
  });
});

// Add an event listener for the 'change' event on the output devices dropdown.
// This allows the script to react when the user selects a different MIDI output device.
dropOuts.addEventListener("change", function() {
  // Change the output device based on the user's selection in the dropdown.
  // The '.channels[1]' specifies that the script should use the first channel of the selected output device.
  // MIDI channels are often used to separate messages for different instruments or sounds.
  myOutput = WebMidi.outputs[this.value].channels[1];
});
