import express from 'express';
import path from 'path';
import axios from 'axios';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 65535;

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
