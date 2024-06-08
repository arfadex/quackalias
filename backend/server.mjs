import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import mongoose from 'mongoose';
import { DUCKDUCKGO_API_KEY, MONGODB_URI } from './config.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(error => console.error('Error connecting to MongoDB Atlas:', error));

const aliasSchema = new mongoose.Schema({
    alias: String
});

const Alias = mongoose.model('Alias', aliasSchema);

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

app.post('/api/save-alias', async (req, res) => {
    const { alias } = req.body;
    try {
        const newAlias = new Alias({ alias });
        await newAlias.save();
        res.status(200).send();
    } catch (error) {
        console.error('Error saving alias:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.get('/api/get-aliases', async (req, res) => {
    try {
        const aliases = await Alias.find().select('alias -_id');
        res.json(aliases.map(a => a.alias));
    } catch (error) {
        console.error('Error retrieving aliases:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.delete('/api/delete-alias', async (req, res) => {
    const { alias } = req.body;
    try {
        await Alias.deleteOne({ alias });
        res.status(200).send();
    } catch (error) {
        console.error('Error deleting alias:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
