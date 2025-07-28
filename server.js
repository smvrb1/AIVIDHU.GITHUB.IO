const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const app = express();

const RUNWAY_API_KEY = 'key_6135bf752983a7fdd864e2be13c4b7a5e23b67297df975bc4fb93f8d012f941a7c903635aeb20af508c37061e962f00c05890d8667d7ef3110460f02cef0030a';

app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/runway-proxy', async (req, res) => {
  const { prompt_text, prompt_image } = req.body;
  if (!prompt_text || !prompt_image) {
    return res.status(400).json({ error: 'Prompt text and image are required.' });
  }
  const payload = {
    model: 'gen4_turbo',
    prompt_image,
    prompt_text,
    ratio: '1280:720',
    duration: 5
  };
  try {
    const response = await fetch('https://api.runwayml.com/v1/inference/gen4_turbo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RUNWAY_API_KEY}`
      },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    if (response.ok && data.video_url) {
      res.json({ video_url: data.video_url });
    } else {
      res.status(500).json({ error: data.error || 'Unknown error from RunwayML API.' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)); 