const express = require('express');
const helmet = require('helmet');
const app = express();
const parser = require('body-parser');

app.use(helmet());

app.use(parser.json());

const secureKeys = ['secretKey1', 'secretKey2'];

app.post('/parse', (req, res) => {
  if (!req.body || !req.body.data) {
    return res.status(400).send({ error: 'Invalid request' });
  }

  const { data } = req.body;
  const parsedData = {};

  for (const key in data) {
    if (secureKeys.includes(key)) {
      parsedData[key] = data[key];
    } else {
      parsedData[key] = '***SECURE DATA HIDDEN***';
    }
  }

  res.send(parsedData);
});

app.listen(3000, () => {
  console.log('Secure web app parser listening on port 3000');
});