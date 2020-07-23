const tokenValidator = require('../src/tokenValidator')
const client = require('../src/player')
const
    BASE_URL = 'api.spotify.com',
    USER_AGENT = "User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:71.0) Gecko/20100101 Firefox/71.0";

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
    const device = process.argv.slice(2).join(' ');
    await player.transfer_and_play(device);
}

main()