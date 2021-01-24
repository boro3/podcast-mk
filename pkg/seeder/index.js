const feedsModel = require('./../feeds')
const podcastModel = require('./../podcast')
const episodesModel = require('./../episodes');
require('./pkg/db/podcast');
const fetch = require('node-fetch');
const xmlProcessor = require('./../xmlprocessor');


const savePodcast = async () => {
    let array = await feedsModel.getAll()
    for (let key in array) {
        let fetchPodcastXml = await fetch(array[key].url);
        let xmlString = await fetchPodcastXml.text()
        let podcastInfo = xmlProcessor.processPodcastInfo(xmlString);
        podcastInfo.pid = array[key]._id
        podcastInfo.url = array[key].url
        podcastModel.save(podcastInfo)
    }
};

const saveEpisodes = async () => {
    let array = await feedsModel.getAll()
     for (let key in array) {
    let fetchPodcastXml = await fetch(array[key].url);
    let xmlString = await fetchPodcastXml.text()
    let episodes = xmlProcessor.processPodcastEpisodes(xmlString);
        for(let i in episodes){
            episodes[i].pid= array[key]._id;
            episodesModel.save(episodes[i])
        }
     }
};



