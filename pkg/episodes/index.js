const mongoose = require('mongoose');

const Feeds = mongoose.model(
    'episode',
    {
        title: String,
        pid: String,
        description: String,
        pubDate: String,
        guid: String,
        link: String,
        url: String,
        _created: Date,
        _deleted: Boolean
    },
    'episode'
);

const save = async (url) => {
    try {
        let data = new Feeds(url);
        data._deleted=false;
        data._created=new Date().toISOString();
        await data.save();
        return data;
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    save
}