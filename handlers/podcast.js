const podcastModel = require('./../pkg/podcast');

const getAll = async (req, res) => {
    try {
        let data = await podcastModel.getAll();
        res.status(200).send(data);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error!");
    }
};


module.exports = {
    getAll
}