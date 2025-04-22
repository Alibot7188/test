const localVideo = document.getElementById('localVideo');

// Initialize camera
async function initCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    localVideo.srcObject = stream;
  } catch (error) {
    console.error("Camera error:", error);
  }
}

initCamera();