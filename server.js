const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('public'));
app.use(express.json({limit: '100mb'}));

//for download test

app.get('/download', (req, res) => {
  const sizeInBytes = 100 * 1024 * 1024; // 10 MB
  const buffer = Buffer.alloc(sizeInBytes, 'a');

  res.setHeader('Content-Type', 'application/octet-stream');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  res.send(buffer);
});


//for upload test

app.post('/upload', (req,res) =>{
    const size = JSON.stringify(req.body).length;
    res.json({received: size });
});

app.listen(3000,() => console.log('Speed test running on http://localhost:3000'));