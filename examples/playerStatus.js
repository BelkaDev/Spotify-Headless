var request = require('request');
const tokenValidator = require('../lib/tokenValidator')
const 
  BASE_URL = 'gew-spclient.spotify.com',
  USER_AGENT="User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:71.0) Gecko/20100101 Firefox/71.0";

class player {
    constructor(session) {
    	this.currentDevice=null;
      this.isPlaying=false;
    	this.auth=session.accessToken;
         }

  async sendAction(apiCall) {
  	var headers = {
    'Authorization': `Bearer ${this.auth}`,
    'authority': BASE_URL,
    'User-Agent': USER_AGENT,
    'pragma': 'no-cache',
    'cache-control': 'no-cache',
    'content-type': 'text/plain;charset=UTF-8',
    'accept': '*/*',
};
var action=""
await this.getStatus();
this.isPlaying ? action = 'pause' : action = 'resume'
var command = '{"command":{"endpoint":"'+action+'"}}';
var options = {
    url: 'https://'+BASE_URL+'/connect-state/v1/player/command/from/source/to/'+this.currentDevice,
    method: 'POST',
    headers: headers,
    body: command
};

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
    this.isPlaying ? console.log('pausing') : console.log('resuming')
    }
}

request(options, callback.bind(this));
  }

async getStatus () {
const session = new tokenValidator();
const result = await session.sendRequest('/v1/me/')
console.log(result)
this.currentDevice=result.device.id;
this.isPlaying=result.is_playing;
}
}
module.exports = player;

