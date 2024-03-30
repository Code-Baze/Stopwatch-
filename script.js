let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let laps = [];

function formatTime(time) {
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = time % 1000;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
}

function updateDisplay() {
  document.querySelector('.display').textContent = formatTime(elapsedTime);
}

function startStopwatch() {
  if (!isRunning) {
    isRunning = true;
    startTime = Date.now() - elapsedTime;
    timer = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateDisplay();
    }, 10);
  }
}

function pauseStopwatch() {
  if (isRunning) {
    isRunning = false;
    clearInterval(timer);
  }
}

function resetStopwatch() {
  pauseStopwatch();
  elapsedTime = 0;
  updateDisplay();
  laps = [];
  document.querySelector('.lap-times').innerHTML = '';
}

function recordLap() {
  if (isRunning) {
    laps.push(elapsedTime);
    const lapTime = document.createElement('li');
    lapTime.textContent = `Lap ${laps.length}: ${formatTime(elapsedTime)}`;
    document.querySelector('.lap-times').appendChild(lapTime);
  }
}

resetStopwatch(); // Initialize display
