const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'client')));

app.listen('8000', '127.0.0.1', () => {
  console.log("Listening on port 8000");
})
