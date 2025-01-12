import express from 'express';
import path from 'path';
import axios from 'axios';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 65535;

// Use environment variables for sensitive data
const encryptionpassword = process.env.ENCRYPTION_PASSWORD || 'raxisthebestidkveryweirdpassword123';

// Helpers for Base64 encoding/decoding
const btoa = (str) => Buffer.from(str, 'binary').toString('base64');
const atob = (str) => Buffer.from(str, 'base64').toString('binary');

let unblockedUrls = [];
const urls = [
    "https://therealastral.astraltech.org",
    "https://sneaky.spynick.com",
    "https://feltcutemightdeletelater.mapadeloscomedores.com",
    "https://to.madhavkhanal.com.np",
    "https://therealastral.h0rst.us"
];

// Middleware to check redirection logic
app.use(async (req, res, next) => {
    if (!req.url) {
        try {
            const response = await axios.get(`https://therealastral.astraltech.org/append?password=${encryptionpassword}&url=${btoa(`${req.protocol}://${req.get('host')}`)}`);
            if (response.data.includes(req.get("host"))) {
                next();
            } else {
                const urlsList = response.data.split("\n").filter(Boolean);
                if (urlsList.length === 0) {
                    res.redirect(urls[Math.floor(Math.random() * urls.length)]);
                } else {
                    res.redirect(urlsList[Math.floor(Math.random() * urlsList.length)]);
                }
            }
        } catch (error) {
            console.error("Redirection middleware error:", error.message);
            res.status(500).send("Internal Server Error: " + error.message);
        }
    } else {
        next();
    }
});

// Static files setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/semag', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'games.html'));
});

app.get('/proxy', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'proxy', 'index.html'));
});

app.get('/static', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'static', 'index.html'));
});

app.get('/services', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'services.html'));
});

app.get('/404', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '404.html'));
});

app.use((req, res) => {
    res.redirect('/404');
  });
  
  app.get('/404', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
  });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
