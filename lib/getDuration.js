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


async function status() {
    const session = new tokenValidator();
    result = await session.sendRequest('/v1/me/player/');
    const token = await getToken(session);
    if (!result) return false
    console.log(msToTime(result.item.duration_ms))

}