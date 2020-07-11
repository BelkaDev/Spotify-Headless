#! /usr/bin/env node

const tokenValidator = require('../lib/tokenValidator')
const client = require('./player')
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
function getType(uri){
return uri.split(':')[1];
}

async function main() {
var context_uri=[]
var uris=[]
var context=true
const session = new tokenValidator();
const token = await getToken(session);
const player = new client(session);
const arg = process.argv.slice(2).join(' ');
console.log(arg)
process.argv.slice(2).forEach(uri => {
var type =  getType(uri)
if (type === 'album' || type === 'artist' || type === 'playlist') {
context_uri.push(uri);
return // read 1st arg only
} else if (type === 'track') {
uris.push(uri)
context=false;
}
})
if (context) await player.play(context_uri[0])
else  { await player.play(uris)
console.log('Queued '+uris.length+' titles.')
}
}
main()