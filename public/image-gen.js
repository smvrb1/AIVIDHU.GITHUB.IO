const RUNWAY_API_KEY = "key_6135bf752983a7fdd864e2be13c4b7a5e23b67297df975bc4fb93f8d012f941a7c903635aeb20af508c37061e962f00c05890d8667d7ef3110460f02cef0030a";
const RUNWAY_IMAGE_URL = "https://api.runwayml.com/v1/generate/text-to-image";

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('image-form');
  const resultDiv = document.getElementById('image-result');

  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const prompt = form.prompt.value.trim();
    if (!prompt) return;
    resultDiv.innerHTML = '<div class="loading">Generating image...</div>';
    try {
      const response = await fetch(RUNWAY_IMAGE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${RUNWAY_API_KEY}`
        },
        body: JSON.stringify({ prompt })
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
      if (data && data.image_url) {
        resultDiv.innerHTML = `<img src="${data.image_url}" alt="Generated image for: ${prompt}" class="generated-image" />`;
      } else {
        resultDiv.innerHTML = '<div class="error">No image returned. Try a different prompt.</div>';
      }
    } catch (err) {
      resultDiv.innerHTML = `<div class="error">Error: ${err.message}. Please check your prompt or try again later.</div>`;
    }
  });
}); 