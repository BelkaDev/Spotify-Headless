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
const session = new tokenValidator();
const token = await getToken(session);
await session.sendRequest('/v1/me/')
}

main()