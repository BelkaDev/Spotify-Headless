#! /usr/bin/env node

const tokenValidator = require('../lib/tokenValidator')
main()
async function getToken(session) {
    await session.checkTokenValidity();
    if (!session.isAlive) {
        await session.generate()
    }
    return session.accessToken;
}
async function main() {
    var type = process.argv.slice(1)[1];
    var query = process.argv.slice(3).join('%20');
    if ((!['album', 'artist', 'track', 'playlist', 'id'].includes(type))) {
        type = 'track'
        query = process.argv.slice(2).join('%20');
    }
    if (query.length == 0) {
        console.log('Enter the ' + type + ' to search.');
        return
    }
    const session = new tokenValidator();
    result = await session.sendRequest('/v1/search?q=' + query + '&type=' + type + '&limit=50');
    const token = await getToken(session);
    if (type === 'album') {
        result.albums.items.forEach((album, i) => {
            console.log(i + '. ' + album.artists[0].name + ' - ' + album.name + ' | ' + album.uri);
        });
    } else if (type === 'artist') {
        result.artists.items.forEach((artist, i) => {
            console.log(i + '. ' + artist.name + '| ' + artist.uri);
        });
    } else if (type === 'track') {
        result.tracks.items.forEach((track, i) => {
            console.log('[' + track.album.name + '] ' + track.artists[0].name + ' - ' + track.name + ' | ' + track.uri);
        });
    }
}