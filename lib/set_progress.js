#! /usr/bin/env node

const tokenValidator = require('../src/tokenValidator')
client = require('../src/player')

main()
function msToTime(s) {
  var ms = s % 1000;
  s = (s - ms) / 1000;
  var secs = s % 60;
  s = (s - secs) / 60;
  var mins = s % 60;
  var hrs = (s - mins) / 60;
  if (hrs > 0) {
  return hrs + ':' + mins + ':' + secs    
  }
  return mins + ':' + secs
}

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
    const percent = process.argv.slice(1)[1]; // position percent (0-100)
    const playback = await session.sendRequest('/v1/me/player/');
    const duration = playback.item.duration_ms
    const progress_ms = (duration * percent)/100
    await player.set_position(progress_ms);

}