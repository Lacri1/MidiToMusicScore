// webPiano.js

const context = new AudioContext();
const pianoSoundURL = 'path/to/piano-sound-file.mp3';
const pianoSound = new Audio(pianoSoundURL);
const piano = context.createMediaElementSource(pianoSound);
piano.connect(context.destination);

// 키보드 입력 이벤트 처리
document.addEventListener('keydown', event => {
    // 입력된 키의 코드를 확인하여 해당하는 음표를 재생
    switch (event.code) {
        case 'KeyA':
            playNote('C4');
            break;
        case 'KeyW':
            playNote('C#4');
            break;
        case 'KeyS':
            playNote('D4');
            break;
        case 'KeyE':
            playNote('D#4');
            break;
        case 'KeyD':
            playNote('E4');
            break;
        case 'KeyF':
            playNote('F4');
            break;
        case 'KeyT':
            playNote('F#4');
            break;
        case 'KeyG':
            playNote('G4');
            break;
        case 'KeyY':
            playNote('G#4');
            break;
        case 'KeyH':
            playNote('A4');
            break;
        case 'KeyU':
            playNote('A#4');
            break;
        case 'KeyJ':
            playNote('B4');
            break;
        case 'KeyK':
            playNote('C5');
            break;
        default:
            break;
    }
});

// 해당 음표 재생 함수
function playNote(note) {
    const oscillator = context.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(getFrequency(note), context.currentTime);
    oscillator.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.5);
}

// 해당 음표의 주파수 계산 함수
function getFrequency(note) {
    const frequencies = {
        'C4': 261.63,
        'C#4': 277.18,
        'D4': 293.66,
        'D#4': 311.13,
        'E4': 329.63,
        'F4': 349.23,
        'F#4': 369.99,
        'G4': 392.00,
        'G#4': 415.30,
        'A4': 440.00,
        'A#4': 466.16,
        'B4': 493.88,
        'C5': 523.25
    };
    return frequencies[note];
}
