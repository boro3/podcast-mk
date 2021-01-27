const he = require('he')
var parser = require('fast-xml-parser');

var options = {
    attributeNamePrefix: "@",
    attrNodeName: "attr",
    textNodeName: "#text",
    ignoreAttributes: false,
    parseAttributeValue: true,
    trimValues: true,
    attrValueProcessor: (val, attrName) => he.decode(val, { isAttributeValue: true }),
    tagValueProcessor: (val, tagName) => he.decode(val)
};

const processPodcastInfo = (xmlFeed) => {

    var tObj = parser.getTraversalObj(xmlFeed, options);
    var jsonObj = (parser.convertToJson(tObj, options));

    let podcast = {};
    podcast.title = jsonObj.rss.channel.title;
    // check and set author
    if (jsonObj.rss.channel.author) {
        podcast.author = jsonObj.rss.channel.author;
    } else if (jsonObj.rss.channel['itunes:author']) {
        podcast.author = jsonObj.rss.channel['itunes:author'];
    } else {
        podcast.author = 'Unavaiable';
    }
    // description
    if (!(jsonObj.rss.channel.description === '') && jsonObj.rss.channel.description) {
        podcast.description = jsonObj.rss.channel.description;
    } else if (!(jsonObj.rss.channel['itunes"summary'] === '') && jsonObj.rss.channel['itunes"summary']) {
        podcast.description = jsonObj.rss.channel['itunes:summary'];
    } else {
        podcast.description = 'Unavaiable';
    }

    // podcast link
    if (jsonObj.rss.channel.link) {
        podcast.link = jsonObj.rss.channel.link;
    } else {
        podcast.link = 'Unavaiable';
    }
    // podcast image
    if (jsonObj.rss.channel['itunes:image']) {
        podcast.image = jsonObj.rss.channel['itunes:image'].attr['@href'];
    } else if (jsonObj.rss.channel.image.url) {
        podcast.image = jsonObj.rss.channel.image.url;
    } else {
        podcast.image = 'Unavaiable';
    }
    return podcast;
};

const processPodcastEpisodes = (xmlFeed) => {
    var tObj = parser.getTraversalObj(xmlFeed, options);
    var jsonObj = (parser.convertToJson(tObj, options));
    let episodes = [];
    let episode = {};

    if (Array.isArray(jsonObj.rss.channel.item)) {
        jsonObj.rss.channel.item.forEach(ep => {
            episode.title = ep.title;
            if (ep.description) {
                episode.description = ep.description;
            } else if (ep['itunes:summary']) {
                episode.description = ep['itunes:summary'];
            } else {
                episode.description = 'Unavaiable';
            }

            if (ep.pubDate) {
                episode.pubDate = new Date(ep.pubDate);
            } else {
                episode.pubDate = 'Unavaiable';
            }

            if (ep.guid) {
                episode.guid = ep.guid['#text'] !== undefined ? ep.guid['#text'] : ep.guid;
            } else {
                episode.guid = 'Unavaiable';
            }

            if (ep.link) {
                episode.link = ep.link;
            } else {
                episode.link = 'Unavaiable';
            }
            episode.url = ep.enclosure.attr['@url'];
            episodes.push(episode);
            episode = {};
        });
    } else {
        episode.title = jsonObj.rss.channel.item.title;
        if (jsonObj.rss.channel.item.description) {
            episode.description = jsonObj.rss.channel.item.description;
        } else {
            episode.description = 'Unavaiable';
        }
        if (jsonObj.rss.channel.item.pubDate) {
            episode.pubDate = new Date(jsonObj.rss.channel.item.pubDate);
        } else {
            episode.pubDate = 'Unavaiable';
        }
        if (jsonObj.rss.channel.item.guid) {
            episode.guid = jsonObj.rss.channel.item.guid['#text'] !== undefined ? jsonObj.rss.channel.item.guid['#text'] : jsonObj.rss.channel.item.guid;
        } else {
            episode.guid = 'Unavaiable';
        }
        if (jsonObj.rss.channel.item.link) {
            episode.link = jsonObj.rss.channel.item.link;
        } else {
            episode.link = 'Unavaiable';
        }
        episode.url = jsonObj.rss.channel.item.enclosure.attr['@url'];
        episodes.push(episode);
        episode = {};
    }
    return episodes;
};

module.exports = {
    processPodcastInfo,
    processPodcastEpisodes
}