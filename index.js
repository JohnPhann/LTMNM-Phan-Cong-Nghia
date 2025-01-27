const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;


app.get('/cv', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'cv.html'));
});


app.get('/', (req, res) => {
  res.send('<h1>Welcome to the Home Page!</h1>');
});


app.get('*', (req, res) => {
  res.status(404).send('<h1>404 - Page Not Found</h1>');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
