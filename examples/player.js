var request = require('request');
const tokenValidator = require('../lib/tokenValidator')
const 
  BASE_URL = 'gew-spclient.spotify.com',
  USER_AGENT="User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:71.0) Gecko/20100101 Firefox/71.0";
  ACTIONS = {
    LOCAL: '/connect-state/v1/player/command/from/',
    TRANSFER: '/connect-state/v1/connect/transfer/from/',
}
class player {
    constructor(session) {
    	this.currentDevice=null;
      this.isPlaying=false;
    	this.auth=session.accessToken;
         }

async getBody(context) {
var _options=[];
if (typeof context === 'string') {
_options.context_uri = context;
return (JSON.stringify(Object.assign({}, _options)));
} else {
_options.uris = context
return (JSON.stringify(Object.assign({}, _options)));
}
}


  async play(input) {
  	var headers = {
    'Authorization': `Bearer ${this.auth}`,
    'User-Agent': USER_AGENT,
   };


var postData = await this.getBody(input)
var options = {
    url: 'https://api.spotify.com/v1/me/player/play',
    method: 'PUT',
    headers: headers,
    body: postData
};

function callback(error, response, body) {
  console.log(body)
  if (error) console.log(body.message)
}

request(options, callback.bind(this));
  }

async getStatus (device=null) {
const session = new tokenValidator();
const result = await session.sendRequest('/v1/me/player/')
if (device == null) this.currentDevice = result.device.id;
else this.currentDevice = device;
this.isPlaying=result.is_playing;
return result.device.id;
}
}
module.exports = player;

