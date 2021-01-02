#! /usr/bin/env node

const tokenValidator = require('../src/tokenValidator')
client = require('../src/player')

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
    const arg = process.argv.slice(2).join(' ');
    const shuffleType = process.argv.slice(1)[1]; // true,false
    await player.set_shuffle(shuffleType);
}