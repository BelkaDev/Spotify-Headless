const tokenValidator = require('../lib/tokenValidator')
const client = require('./playerStatus')
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
const session = new tokenValidator();
const token = await getToken(session);
const player = new client(session);
var x = await player.sendAction('/connect-state/v1/player/command/from/22d6aea8bbb189ebd4616c8655a473ba4e513d85/to/140a29100980b698f8d97e74145c87be8d1bcd42');
}

main()