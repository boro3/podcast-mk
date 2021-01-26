const episodesModel = require('../episodes');
const podcastModel = require('../podcast');
const fetch = require('node-fetch');
const xmlProcessor = require('../xmlprocessor');

const saveNewEpisodes = async (feedUrl) => {
    let podcast = await podcastModel.getOneByUrl(feedUrl);
    let fetchPodcastXml = await fetch(podcast.url);
    let xmlString = await fetchPodcastXml.text();
    let episodes = xmlProcessor.processPodcastEpisodes(xmlString);
    for (let i in episodes) {
        let ep = await episodesModel.getLastEpisodeByPodcastId(episodes[i].url)
        if (ep.pubDate < episodes[i].pubDate)
            episodes[i].pid = podcast._id;
        episodesModel.save(episodes[i]);
    }
};

module.exports = {
    saveNewEpisodes
}
