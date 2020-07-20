#! /usr/bin/env node

const tokenValidator = require('../lib/tokenValidator')
client = require('../lib/player')

main()
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
    if (device.length == 0) await player.play_pause();
    else await player.transfer_stream_and_play(device);
}