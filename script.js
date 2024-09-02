const msg = new SpeechSynthesisUtterance();
let voice = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"],[name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop')

msg.text = document.querySelector('[name="text"]').value;

function populateVoices() {
    voice = this.getVoices();
    const voiceOptions = voice
        .filter(voice => voice.lang.includes('en'))
        .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
        .join('');
    voicesDropdown.innerHTML = voiceOptions;
}

function setVoice() {
    msg.voice = voice.find(voice => voice.name === this.value);
    toggle()
}

function toggle(startOver = true) {
    speechSynthesis.cancel();
    if (startOver) {
        speechSynthesis.speak(msg)
    }
}

function setOption() {
    console.log(this.name, this.value)
    msg[this.name] = this.value;
    toggle();
}

speechSynthesis.addEventListener('voiceschanged', populateVoices)
voicesDropdown.addEventListener('change', setVoice);
options.forEach(option => option.addEventListener('change', setOption));
speakButton.addEventListener('click', toggle)
stopButton.addEventListener('click', function () {
    toggle(false)
})
