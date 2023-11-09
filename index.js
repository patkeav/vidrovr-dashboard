const express = require('express');

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
const assets = require('./data/assets.json');
const assetDetails = require('./data/asset-details.json');
const assetPreviews = require('./data/asset-previews.json');
const persons = require('./data/persons.json');

const api = express();
const bodyParser = require('body-parser');
// create application/json parser
const jsonParser = bodyParser.json();
const apiPort = 5678;
// enable cors from localhost:appPort
const appPort = 5173;
const cors = require('cors');
const corsOptions = {
  origin: `http://localhost:${appPort}`,
  credentials: true
};
api.use(cors(corsOptions));

// serve json files
api.get('/assets', async (req, res) => {
  await sleep(1000);
  res.send({ data: assets, error: null });
});

api.post('/asset_previews', jsonParser, async (req, res) => {
  const assets = req.body.assets;
  let previews = [];
  if (!assets) res.status(404).send('Please provide list of asset IDs');
  else {
    assets.forEach((asset_id) => {
      const preview = assetPreviews.find((a) => a.id === asset_id);
      if (preview) {
        previews = [...previews, preview];
      } else {
        previews = [...previews, `No preview found for asset_id: ${asset_id}`];
      }
    });
    res.send({ data: previews, error: null });
  }
});

api.get('/assets/:id', async (req, res) => {
  await sleep(750);
  const asset = assetDetails.find((a) => a.id === req.params.id);
  if (!asset) {
    res.status(404).send({
      data: null,
      error: {
        message: 'Asset not found',
        code: 404
      }
    });
  } else {
    res.send({ data: asset, error: null });
  }
});

api.get('/assets/:id/persons', async (req, res) => {
  await sleep(750);
  const personsInAsset = persons[req.params.id];
  if (!personsInAsset) {
    res.status(404).send({
      data: null,
      error: {
        message: 'Asset not found',
        code: 404
      }
    });
  } else {
    res.send({ data: personsInAsset, error: null });
  }
});

api.listen(apiPort, () => {
  console.log(`Dashboard API listening on port ${apiPort}`);
});

// log errors to the console
api.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
