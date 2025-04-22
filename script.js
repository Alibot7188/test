// Elements
const videoURL     = document.getElementById('videoURL');
const loadVideoBtn = document.getElementById('loadVideo');
const startBtn     = document.getElementById('startRec');
const stopBtn      = document.getElementById('stopRec');
const camPreview   = document.getElementById('camPreview');
const timerDisplay = document.getElementById('timer');
const downloadLink = document.getElementById('downloadLink');
const themeToggle  = document.getElementById('themeToggle');

let mediaRecorder, recordedChunks = [];
let recordStartTime, timerInterval;
let ytPlayer, isYTReady = false;

// 1️⃣ Theme toggle
themeToggle.addEventListener('click', () => {
  const dark = document.documentElement.toggleAttribute('data-theme');
  themeToggle.textContent = dark ? '☀️' : '🌙';
});

// 2️⃣ YouTube IFrame API
window.onYouTubeIframeAPIReady = () => {
  ytPlayer = new YT.Player('youtubePlayer', {
    playerVars: { modestbranding: 1, controls: 1, rel: 0 },
    events: {
      onReady: () => { isYTReady = true; startBtn.disabled = false; },
      onStateChange: handleYTState
    }
  });
};

// 3️⃣ Load video
loadVideoBtn.addEventListener('click', () => {
  const url = videoURL.value.trim();
  const m = url.match(/[?&]v=([^&]+)/) || url.match(/youtu\.be\/([^?]+)/);
  if (m?.[1] && isYTReady) {
    ytPlayer.loadVideoById(m[1]);
  } else {
    alert('Enter a valid YouTube URL and wait for the player to load.');
  }
});

// 4️⃣ Init camera & recorder
async function initCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    camPreview.srcObject = stream;
    camPreview.play().catch(() => {});
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = e => e.data.size && recordedChunks.push(e.data);
    mediaRecorder.onstop = makeDownload;
  } catch {
    alert('Camera/mic access required (HTTPS or localhost).');
  }
}

// 5️⃣ Auto‑record on play/pause
function handleYTState(e) {
  if (e.data === YT.PlayerState.PLAYING && mediaRecorder?.state === 'inactive') {
    recordedChunks = [];
    mediaRecorder.start();
    recordStartTime = Date.now();
    timerInterval = setInterval(updateTimer, 500);
    startBtn.disabled = true;
    stopBtn.disabled  = false;
  }
  if ([YT.PlayerState.PAUSED, YT.PlayerState.ENDED].includes(e.data)
      && mediaRecorder?.state === 'recording') {
    mediaRecorder.stop();
    clearInterval(timerInterval);
    startBtn.disabled = false;
    stopBtn.disabled  = true;
  }
}

// 6️⃣ Manual controls
startBtn.onclick = () => ytPlayer.playVideo();
stopBtn.onclick  = () => ytPlayer.pauseVideo();

// 7️⃣ Timer update
function updateTimer() {
  const s = Math.floor((Date.now() - recordStartTime)/1000);
  timerDisplay.textContent = `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;
}

// 8️⃣ Build download link
function makeDownload() {
  const blob = new Blob(recordedChunks, { type: 'video/webm' });
  downloadLink.href    = URL.createObjectURL(blob);
  downloadLink.download = 'reaction.webm';
  downloadLink.style.display = 'block';
}

// 9️⃣ Start
window.addEventListener('load', initCamera);
