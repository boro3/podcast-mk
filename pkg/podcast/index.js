const mongoose = require('mongoose');

const Podcast = mongoose.model(
    'podcast',
    {
        url: String,
        title: String,
        description: String,
        category: String,
        author: String,
        link: String,
        image: String,
        _deleted: Boolean,
        _created: Date
    },
    'podcast'
);

const save = async (podcast) => {
        let data = new Podcast(podcast);
        data._deleted = false;
        data._created = new Date().toISOString();
        await data.save();
        return data;
};

const getAll = async () => {
        let data = await Podcast.find({ _deleted: false });
        return data;
};

const getOneById = async (id) => {
        let data = await Podcast.findOne({ id: id, _deleted: false });
        return data;
};

const getOneByUrl = async (url) => {
    let data = await Podcast.findOne({ url: url, _deleted: false });
    return data;
};

module.exports = {
    save,
    getAll,
    getOneById,
    getOneByUrl
}