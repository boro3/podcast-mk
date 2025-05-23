const cfg = require('./pkg/config');
const podcast = require ('./handlers/podcast');
require('./pkg/db');


const express = require ('express');
const bodyParser = require('body-parser');

const api = express();
api.use(bodyParser.json());

//get Episodes for podcast by ID
api.get('/api/v1/podcast/:pid/episodes', podcast.getEpisodesByPodcastId);

//get All podcasts
api.get('/api/v1/podcast', podcast.getAll);

//get Episode for podcast by ID and episode id
// api.get('/api/v1/podcast/:pid/episodes/:eid', episodes.getEpisodeByPodcastId);

api.listen(cfg.get('server').port, err => {
    if (err) {
        console.error('Could not start server!', err);
    }
    console.log('Server successfully started on port', cfg.get('server').port);
});


