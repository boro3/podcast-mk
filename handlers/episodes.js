const episodeModel = require('./../pkg/episodes');

const getByPodcastId = async (req, res) => {
    try {
        let data = await episodeModel.getByPodcastId(req.params.id);
        res.status(200).send(data);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error!");
    }
};


module.exports = {
    getByPodcastId
}