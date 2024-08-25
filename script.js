// Your script here.

  
  
  const msg = new SpeechSynthesisUtterance(); // Create a new speech synthesis utterance
  let voices = []; // Array to store available voices
  const voicesDropdown = document.querySelector('[name="voice"]'); // Select element for voice selection
  const options = document.querySelectorAll('[type="range"], [name="text"]'); // Range inputs for rate and pitch, and textarea for text input
  const speakButton = document.querySelector('#speak'); // Speak button
  const stopButton = document.querySelector('#stop'); // Stop button

  // Function to populate the voice list
  function populateVoices() {
    voices = speechSynthesis.getVoices(); // Get the list of available voices
    voicesDropdown.innerHTML = voices
      .map(
        (voice) =>
          `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`
      )
      .join(''); // Populate the dropdown with voice options
  }

  // Function to set the selected voice
  function setVoice() {
    msg.voice = voices.find(voice => voice.name === this.value); // Find the selected voice and set it
    toggle(); // Restart speech with new voice if already speaking
  }

  // Function to toggle speech on or off
  function toggle(startOver = true) {
    speechSynthesis.cancel(); // Stop any ongoing speech
    if (startOver) {
      speechSynthesis.speak(msg); // Start speaking with the updated settings
    }
  }

  // Function to set options for rate and pitch
  function setOption() {
    msg[this.name] = this.value; // Set the rate or pitch based on the input name and value
    toggle(); // Restart speech with updated settings if already speaking
  }

  // Event listener for when the list of voices changes
  speechSynthesis.addEventListener('voiceschanged', populateVoices);

  // Event listener for when a new voice is selected from the dropdown
  voicesDropdown.addEventListener('change', setVoice);

  // Event listeners for changes to rate, pitch, and text
  options.forEach(option => option.addEventListener('change', setOption));

  // Event listener for the speak button
  speakButton.addEventListener('click', toggle);

  // Event listener for the stop button
  stopButton.addEventListener('click', () => toggle(false));

  // Initialize speech synthesis settings
  msg.text = document.querySelector('[name="text"]').value; // Set the initial text to be spoken

