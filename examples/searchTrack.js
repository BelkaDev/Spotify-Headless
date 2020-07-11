const tokenValidator = require('../lib/tokenValidator')
const 
  BASE_URL = 'api.spotify.com',
  USER_AGENT="User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:71.0) Gecko/20100101 Firefox/71.0";

async function getToken(session) {
await session.checkTokenValidity();
if (!session.isAlive) {
await session.generate()
}
return session.accessToken;
}

async function main() {
const query = process.argv.slice(2).join('%20');
if (query.length == 0) {
	console.log('Enter a track to search');
	return
}
const session = new tokenValidator();
const token = await getToken(session);
result = await session.sendRequest('/v1/search?q='+query+'&type=track&limit=50');

result.tracks.items.forEach(track => { 
  console.log(track.artists[0].name+' - '+track.name+' ('+ track.album.name + ')'+' | '+track.uri+''); 
}); 
}

main()