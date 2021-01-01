// Note that 'request' is deprecated: https://github.com/request/request/issues/3142
var request = require('request');
var tokenValidator = require('./tokenValidator');
const
    BASE_URL = 'gew-spclient.spotify.com',
    USER_AGENT = "User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:71.0) Gecko/20100101 Firefox/71.0";
ACTIONS = {
    LOCAL: '/connect-state/v1/player/command/from/',
    TRANSFER: '/connect-state/v1/connect/transfer/from/',
}
class player {
    constructor(session) {
        this.currentDevice = null;
        this.isPlaying = false;
        this.auth = session.accessToken;
    }

    async getBody(context) {
        var _options = [];
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

        function callback(error, response, body) {}

        request(options, callback.bind(this));
    }

async play_pause() {
        var headers = {
            'Authorization': `Bearer ${this.auth}`,
            'Content-Type': 'application/json'
        };
        var action='play'
        await this.getStatus()
        if (this.isPlaying) action='pause'
        var options = {
            url: 'https://api.spotify.com/v1/me/player/'+action,
            method: 'PUT',
            headers: headers,
        };

        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
            }
        }

        request(options, callback);

    }


    async transfer_and_play(target_device) {
        var headers = {
            'Authorization': `Bearer ${this.auth}`,
            'Content-Type': 'application/json'
        };
        var _options = [];
        _options.device_ids = [target_device];
        _options.play = true;
        var postData = JSON.stringify(Object.assign({}, _options));
        var options = {
            url: 'https://api.spotify.com/v1/me/player',
            method: 'PUT',
            headers: headers,
            body: postData
        };

        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
            }
        }

        request(options, callback);

    }
    async getStatus(device = null) {
        const session = new tokenValidator();
        const result = await session.sendRequest('/v1/me/player/')
        if (device == null) this.currentDevice = result.device.id;
        else this.currentDevice = device;
        this.isPlaying = result.is_playing;
        return result.device.id;
    }
}
module.exports = player;