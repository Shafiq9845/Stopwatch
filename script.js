let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let lapCounter = 1;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStop');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

function updateTime() {
    const currentTime = Date.now();
    const timeDifference = currentTime - startTime + elapsedTime;

    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((timeDifference % 1000));

    display.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
}

function startStopTimer() {
    if (isRunning) {
        clearInterval(timer);
        elapsedTime += Date.now() - startTime;
        startStopBtn.textContent = 'Start';
    } else {
        startTime = Date.now();
        timer = setInterval(updateTime, 10); // Updated to 10ms for millisecond accuracy
        startStopBtn.textContent = 'Stop';
    }
    isRunning = !isRunning;
}

function resetTimer() {
    clearInterval(timer);
    display.textContent = '00:00:00.000';
    startStopBtn.textContent = 'Start';
    isRunning = false;
    elapsedTime = 0;
    lapsContainer.innerHTML = '';
    lapCounter = 1;
}

function recordLap() {
    if (isRunning) {
        const lapTime = display.textContent;
        const lapElement = document.createElement('div');
        lapElement.textContent = `Lap ${lapCounter}: ${lapTime}`;
        lapsContainer.appendChild(lapElement);
        lapCounter++;
    }
}

startStopBtn.addEventListener('click', startStopTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);
