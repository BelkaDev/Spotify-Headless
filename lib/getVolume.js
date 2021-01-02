#! /usr/bin/env node

const tokenValidator = require('../src/tokenValidator')
status()
async function getToken(session) {
    await session.checkTokenValidity();
    if (!session.isAlive) {
        await session.generate()
    }
    return session.accessToken;
}
async function status() {

    const session = new tokenValidator();
    result = await session.sendRequest('/v1/me/player/');
    const token = await getToken(session);
    if (!result) return false
    console.log(result.device.volume_percent)
}