const mongoose = require('mongoose');

const Podcast = mongoose.model(
    'podcast',
    {
        pid: String,
        url: String,
        title: String,
        description: String,
        author: String,
        link: String,
        image: String,
        _deleted: Boolean,
        _created: Date
    },
    'podcast'
);

const save = async (podcast) => {
    try {
        let data = new Podcast(podcast);
        data._deleted= false;
        data._created= new Date().toISOString();
        await data.save();
    } catch (err) {
        console.log(err);
    }
};

const getAll = async () => {
    try {
        let data = await Podcast.find({_deleted:false});
        return data;
    } catch (err) {
        console.log(err);
    }
};

const getOneById = async (id) => {
    try {
        let data = await Podcast.findOne({ id: id ,_deleted:false});
        return data;
    } catch (err) {
        console.log(err);
    }
};

const getOneByUrl = async (url) => {
    let data = await Podcast.findOne({ url: url, _deleted:false });
    return data;
};

module.exports = {
    save,
    getAll,
    getOneById,
    getOneByUrl
}