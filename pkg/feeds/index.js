const mongoose = require('mongoose');

const Feeds = mongoose.model(
    'feeds',
    {
        url: String,
        id: String
    },
    'feeds'
);

const getAll = async () => {
    try {
        let data = await Feeds.find({});
        return data;
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    getAll
}