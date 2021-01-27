const podcastModel = require('./../pkg/podcast');
const episodeModel = require('./../pkg/episodes');

const getAll = async (req, res) => {
    try {
        let data = await podcastModel.getAll();
        res.status(200).send(data);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error!");
    }
};


const getEpisodesByPodcastId = async (req, res) => {
    try {
        let data = await episodeModel.getEpisodesByPodcastId(req.params.pid);
        res.status(200).send(data);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error!");
    }
};

module.exports = {
    getAll,
    getEpisodesByPodcastId
}