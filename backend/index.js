const express = require('express');
const axios = require('axios');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();


const app = express();
app.use(cors());
app.use(express.json());

const AUDIO_DIR = path.join(__dirname, 'audio_files');
if (!fs.existsSync(AUDIO_DIR)) {
    fs.mkdirSync(AUDIO_DIR);
}

// Route to handle text-to-speech request
app.get('/generate-audio', async (req, res) => {
    const { text_prompt, file_name } = req.query;

    if (!text_prompt || !file_name) {
        return res.status(400).send('Invalid request: Missing text_prompt or file_name.');
    }

    try {
        const response = await axios({
            method: 'post',
            url: 'https://api.elevenlabs.io/v1/text-to-speech/TxGEqnHWrfWFTfGW9XjX',
            headers: {
                'Accept': 'audio/mpeg',
                'Content-Type': 'application/json',
                'xi-api-key': process.env.ELEVENLABS_API_KEY
            },
            data: {
                text: text_prompt,
                model_id: 'eleven_monolingual_v1',
                voice_settings: {
                    stability: 0.5,
                    similarity_boost: 0.5,
                    style: 0.9
                }
            },
            responseType: 'stream'
        });

        const filePath = path.join(AUDIO_DIR, file_name);
        const writer = fs.createWriteStream(filePath);
        response.data.pipe(writer);

        writer.on('finish', () => {
            res.sendFile(filePath);
        });

        writer.on('error', () => {
            res.status(500).send('Failed to save the audio file.');
        });
    } catch (error) {
        console.error('Error generating audio:', error);
        res.status(500).send('Error generating audio.');
    }
});

// Serve the audio files statically
app.use('/audio', express.static(AUDIO_DIR));

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
