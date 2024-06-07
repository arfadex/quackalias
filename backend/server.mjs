import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import { DUCKDUCKGO_API_KEY } from './config.js'; 

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post('/api/generate-alias', async (req, res) => {
    try {
        const response = await fetch('https://quack.duckduckgo.com/api/email/addresses', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${DUCKDUCKGO_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        console.log('Response data:', data); 

        if (!response.ok) {
            return res.status(response.status).json(data);
        }

        res.json(data);
    } catch (error) {
        console.error('Error generating alias:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});