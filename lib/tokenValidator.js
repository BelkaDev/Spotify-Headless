const 
  fs = require('fs');
  path = require('path'),
  https = require('https'),
  process = require('process'),
  puppeteer = require('puppeteer');

const 
  BASE_URL = 'api.spotify.com',
  USER_AGENT='User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:71.0) Gecko/20100101 Firefox/71.0'
  FILE_PATH = path.join(__dirname, '.', 'OAuth.json' );
//const global_package_path = process.argv[ 0 ].split( '/bin/node' )[ 0 ] + '/lib/node_modules';
//const puppeteer = require( path.join( global_package_path ,  'puppeteer' ) );
class tokenValidator {
    constructor() {
      var cache=require(FILE_PATH);
      this.accessToken=cache.accessToken;
      this.refreshToken=cache.refreshToken;
      this.accessTokenExpiration=null;
    	this.isAlive=false;
    	this.isAuthorized=true;
  }

   async sendRequest(apiCall) {
   return new Promise((resolve, reject) => {
    https.get({
      host: BASE_URL,
      path: apiCall,
      headers: {
        Accept: '*/*',
        'User-Agent': USER_AGENT,
        'Authorization': `Bearer ${this.accessToken}`,
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-site'
      }
    }, (res) => {
      let body = ''
      res.on('data', (data) => { body += data})
      res.on('end', () => { var result = JSON.parse(body)
      resolve(result)
       })
      if (res.statusCode != '401' ) {
      	this.isAlive=true;
      }
    }).on('error', (e) => {
      console.log('request failed: ', e.message)
      reject(e)
    })
  })
  }

   async checkTokenValidity() {
   await this.sendRequest('/v1/me')
   }

 async refreshAccessToken() {
 return new Promise((resolve, reject) => {
    https.get({
      host: 'open.spotify.com',
      path: '/get_access_token?reason=transport',
      headers: {
        Accept: '*/*',
        'cookie':`sp_dc=${this.refreshToken}`,
        'User-Agent': USER_AGENT,
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-site'
      }
    }, (res) => {
      console.log(res.statusCode)
      let body = ''
      res.on('data', (data) => { body += data})
      res.on('end', () => { 
    try {
      var result = JSON.parse(body)
      this.accessToken=result.accessToken
      }
     catch (e) {
     this.isAuthorized=false;
     }
     finally {
      resolve(result)
     }
       })
    })
  })
   }

  async generate() {
      await this.refreshAccessToken()
      if (!this.isAuthorized) {
      console.log('Refresh token has expired or was not retrieved.')
      const browser = await puppeteer.launch( { headless: true } );
	console.log('Logging on to Spotify.')
	const page = await browser.newPage();
	await page.goto('https://accounts.spotify.com/en/login?continue=https:%2F%2Fopen.spotify.com%2F');
	await page.type('#login-username', process.env.SPOTIFY_USER);
	await page.type('#login-password', process.env.SPOTIFY_PWD);
	await page.click('#login-button');
	await page.waitForNavigation();
	const token_info = await page.evaluate( () => {
		const token_script = document.getElementById( 'config' );
		const token_json = token_script.text.trim();
		const token_info = JSON.parse( token_json );
		return token_info;
	});
      const cookies = await page.cookies();
      cookies.forEach(cookie => {
        if (cookie.name === 'sp_dc')  {
          this.refreshToken=cookie.value;
        }
}); 
	await browser.close();
	this.accessToken=token_info['accessToken'];
	this.clientId=token_info['clientId'];
	this.accessTokenExpiration=token_info['accessTokenExpirationTimestampMs'];
      }
	const cache={'accessToken':this.accessToken,'refreshToken':this.refreshToken}
  	fs.writeFile(FILE_PATH, JSON.stringify(cache), 'utf8' ,  (err) => {
  	if (err) throw err;
});
}
}
module.exports = tokenValidator;
