const 
  fs = require("fs");
  path = require("path"),
  https = require("https"),
  process = require("process"),
  puppeteer = require('puppeteer');

const 
  BASE_URL = 'api.spotify.com',
  USER_AGENT="User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:71.0) Gecko/20100101 Firefox/71.0"
  FILE_PATH = path.join(__dirname, '.', 'OAuth.json' );
//const global_package_path = process.argv[ 0 ].split( "/bin/node" )[ 0 ] + "/lib/node_modules";
//const puppeteer = require( path.join( global_package_path ,  "puppeteer" ) );
class tokenValidator {
    constructor() {
    	var cache=require(FILE_PATH);
    	this.isAlive=false;
    	this.accessToken=cache.accessToken;
    	this.clientId=null;
    	this.result=[];
    	this.accessTokenExpiration=null;
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
      result.error == null  ?
       console.log('STATUS_CODE: ' + res.statusCode)
       : null
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
   await this.sendRequest('/v1/')
   }

  async generate() {  	
	const browser = await puppeteer.launch( { headless: true } );
	console.log('Logging on to Spotify.')
	const page = await browser.newPage();
	await page.goto( "https://accounts.spotify.com/en/login?continue=https:%2F%2Fopen.spotify.com%2F" , { waitUntil: "networkidle0" } );
	await page.type( "#login-username" ,  process.env.SPOTIFY_USER );
	await page.type( '#login-password',  process.env.SPOTIFY_PWD);
	await page.click( "#login-button" );
	console.log('Connected.\nObtaining new access token.')
	await page.waitForNavigation( { waitUntil: "networkidle0" } );
	const token_info = await page.evaluate( () => {
		const token_script = document.getElementById( "config" );
		const token_json = token_script.text.trim();
		const token_info = JSON.parse( token_json );
		return token_info;
	});
	await browser.close();
	this.accessToken=token_info[ "accessToken" ];
	this.clientId=token_info[ "clientId" ];
	this.accessTokenExpiration=token_info[ "accessTokenExpirationTimestampMs" ];
	const object={"accessToken":token_info[ "accessToken" ]}
  	fs.writeFile(FILE_PATH, JSON.stringify(object), "utf8" ,  (err) => {
      console.log('Error storing token');
  	if (err) throw err;
});
}
}
module.exports = tokenValidator;
