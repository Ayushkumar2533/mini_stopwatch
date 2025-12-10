let display = document.getElementById('display');
let startBtn = document.getElementById('start');
let stopBtn = document.getElementById('stop');
let lapBtn = document.getElementById('lap');
let resetBtn = document.getElementById('reset');
let lapsList = document.getElementById('laps');

let startTime;
let stopTime = 0;
let interval;
let running = false;
let lapCount = 0;
let lapTimes = [];

function formatTime(time) {
    let ms = Math.floor(time % 1000);
    let seconds = Math.floor((time / 1000) % 60);
    let minutes = Math.floor((time / (1000 * 60)) % 60);
    let hours = Math.floor(time / (1000 * 60 * 60));
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function updateDisplay() {
    let currentTime = running ? Date.now() - startTime + stopTime : stopTime;
    display.textContent = formatTime(currentTime);
}

function addLap() {
    if (!running && lapTimes.length === 0) return;
    
    let currentTime = running ? Date.now() - startTime + stopTime : stopTime;
    lapTimes.push(currentTime);
    lapCount++;
    
    let lapItem = document.createElement('li');
    lapItem.className = 'lap-item';
    lapItem.innerHTML = `<span>Lap ${lapCount}</span><span>${formatTime(currentTime)}</span>`;
    lapsList.appendChild(lapItem);
}

startBtn.addEventListener('click', () => {
    if (!running) {
        startTime = Date.now();
        interval = setInterval(updateDisplay, 10);
        running = true;
        startBtn.textContent = 'Pause';
        lapBtn.disabled = false;
    } else {
        stopTime += Date.now() - startTime;
        clearInterval(interval);
        running = false;
        startBtn.textContent = 'Resume';
    }
});

stopBtn.addEventListener('click', () => {
    if (running) {
        stopTime += Date.now() - startTime;
        clearInterval(interval);
        running = false;
        startBtn.textContent = 'Resume';
    }
});

lapBtn.addEventListener('click', addLap);

resetBtn.addEventListener('click', () => {
    clearInterval(interval);
    running = false;
    stopTime = 0;
    lapTimes = [];
    lapCount = 0;
    display.textContent = '00:00:00';
    startBtn.textContent = 'Start';
    lapsList.innerHTML = '';
    lapBtn.disabled = true;
});

// Initialize
lapBtn.disabled = true;
updateDisplay();
