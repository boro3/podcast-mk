const mongoose = require('mongoose');

const Episode = mongoose.model(
    'episode',
    {
        title: String,
        pid: String,
        description: String,
        pubDate: Date,
        guid: String,
        link: String,
        url: String,
        _created: Date,
        _deleted: Boolean
    },
    'episode'
);

const save = async (edata) => {
    let data = new Episode(edata);
    data._deleted = false;
    data._created = new Date().toISOString();
    await data.save();
    return data;
};

const findByTitle = async (title) => {
    let data = await Episode.findOne({ title: title });
    return data;
};

const findByUrl = async (url) => {
    let data = await Episode.findOne({ url: url })
    return data;
};
const getEpisodesByPodcastId = async (podcastId) => {
    let data = await Episode.find({ pid: podcastId, _deleted: false });
    return data;
};
const getLastEpisodeByPodcastId = async (podcastId) => {
    let data = await Episode.find({ pid: podcastId, _deleted: false }).sort({pubDate:-1}).limit(1);
    return data;
};


module.exports = {
    save,
    findByTitle,
    findByUrl,
    getEpisodesByPodcastId,
    getLastEpisodeByPodcastId
};