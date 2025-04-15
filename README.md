# 🎚️ Frequency Balance Analyzer

The **Frequency Balance Analyzer** is a JavaScript-based tool that performs real-time audio analysis to examine the spectral balance of an uploaded audio file. It measures energy in low, mid, and high frequency bands, converting raw audio signal strength (RMS) into dB values and offering recommendations for tonal adjustments based on a reference.

---

## 🧠 Project Goals

- **Accessible Audio Analysis**: Make frequency balancing and technical evaluation approachable for musicians and users without deep tech backgrounds.
- **Guided Enhancement**: Provide intuitive suggestions to improve the tonal balance of recordings.
- **Genre Awareness**: Lay groundwork for future enhancements that tailor analysis to different musical genres.

---

## 🛠️ Features

- **Real-time analysis** using the Web Audio API
- Splits audio into **three bands**:
  - Low-pass (< 250 Hz)
  - Band-pass (~1000 Hz center)
  - High-pass (> 4000 Hz)
- Calculates **RMS** and converts to **decibels**
- Compares results with a **reference balance**
- Suggests whether to **amplify or attenuate** each band
- Web MIDI support for future audio interaction capabilities

---

## 📁 Project Structure

```plaintext
.
├── index.html          # UI for file upload and results display
├── analysis.js         # Core logic for audio analysis
├── upload.js           # Handles file input and buffer loading
├── README.md           # (You're here!)
└── Ghasemi Programming Final Design.pdf # Signal flow and design notes
```

---

## 📊 Signal Flow

The signal chain (documented in `Ghasemi Programming Final Design.pdf`) routes audio through:

- Source ➝ Low/Band/High Filters ➝ Analyser Nodes ➝ RMS ➝ dB ➝ Comparison Engine ➝ Output Suggestion

---

## 🚧 Known Limitations & Future Improvements

| Issue                      | Description                                                                          | Proposed Solution                                    |
| -------------------------- | ------------------------------------------------------------------------------------ | ---------------------------------------------------- |
| 🎧 Genre Blindness         | Uniform recommendations don't account for stylistic differences (e.g., Jazz vs. Pop) | Implement genre-specific reference profiles          |
| 🕒 RMS Timing Delay        | Timeout causes slightly inaccurate RMS in real-time                                  | Use offline analysis before playback                 |
| 🧮 RMS Complexity          | Initial RMS implementation was mathematically intensive                              | Already resolved via breakdown and simplification    |
| 🔌 Interface Compatibility | Limited testing with external audio interfaces                                       | Add broader I/O support and MIDI routing flexibility |

---

## 🚀 Getting Started

1. Clone this repo or open the `index.html` in a browser.
2. Upload any `.mp3`, `.wav`, or audio file.
3. View dB levels of low, mid, and high frequency bands.
4. Read suggestions in the browser console.

---

## 🧪 Example Output

```bash
Low dB: -13.42, Mid dB: -18.12, High dB: -20.58
→ You have to amplify your mid range by 3.12 dB
→ You have to attenuate your low range by 1.42 dB
```

---

## 🧩 Technologies Used

- JavaScript (ES6 Modules)
- Web Audio API
- Web MIDI API (for future extensions)
- HTML5

---

## 💡 Inspiration & Reflection

> “I wanted to bridge the gap between professional audio engineering tools and beginner-friendly sound enhancement... I learned a lot about frequency behavior and digital signal processing through building this.”  
> — _Negar Ghasemi_

---

## 📄 License

MIT License
