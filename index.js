import express from 'express';
import fetch from 'node-fetch';
import { HttpsProxyAgent } from 'https-proxy-agent';

const SERVER_PORT = process.env.PORT || 3000;

async function getCurrentTimeViaFixie() {
  try {
    const response = await fetch(`http://worldclockapi.com/api/json/utc/now`, {
      agent: new HttpsProxyAgent({
        proxy: process.env.FIXIE_URL
      }),
    });
    const data = await response.json();
    return `The current UTC time is ${data.currentDateTime}. Request to worldclockapi.com made through Fixie.`;
  } catch (error) {
    return `Error: ${error.message}`;
  }
}

express()
  .get('/', (req, res) => {
    getCurrentTimeViaFixie().then((response) => {
      res.send(response);
    });
  })
  .listen(SERVER_PORT, () => console.log(`Listening on ${SERVER_PORT}`));
