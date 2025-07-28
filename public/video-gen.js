const RUNWAY_API_KEY = "key_6135bf752983a7fdd864e2be13c4b7a5e23b67297df975bc4fb93f8d012f941a7c903635aeb20af508c37061e962f00c05890d8667d7ef3110460f02cef0030a";
const RUNWAY_VIDEO_URL = "https://api.runwayml.com/v1/generate/video";

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('video-form');
  const resultDiv = document.getElementById('video-result');
  const imageInput = document.getElementById('image-upload');

  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const prompt = form.prompt.value.trim();
    const imageFile = imageInput.files[0];
    if (!prompt || !imageFile) return;
    resultDiv.innerHTML = '<div class="loading">Generating video...</div>';
    try {
      // Convert image to base64 data URI
      const dataUri = await toDataURL(imageFile);
      // Call PHP proxy
      const response = await fetch('runway-proxy.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt_text: prompt, prompt_image: dataUri })
      });
      if (!response.ok) {
        let errorMsg = 'API error';
        try {
          const errData = await response.json();
          errorMsg = errData.error || errorMsg;
        } catch {}
        throw new Error(errorMsg);
      }
      const data = await response.json();
      if (data && data.video_url) {
        resultDiv.innerHTML = `<video controls class="generated-video"><source src="${data.video_url}" type="video/mp4">Your browser does not support the video tag.</video>`;
      } else {
        resultDiv.innerHTML = '<div class="error">No video returned. Try a different prompt or image.</div>';
      }
    } catch (err) {
      resultDiv.innerHTML = `<div class="error">Error: ${err.message}. Please check your prompt, image, or try again later.</div>`;
    }
  });

  function toDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
}); 