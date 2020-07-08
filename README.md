## Spotify-JWT
 A [puppeteer](https://github.com/puppeteer/puppeteer) approach to intercept Spotify OAuth token (alongside of fingerprints) then reinject it to reproduce a secured, browser-like traffic/behaviour.
#### How it works
1. Establish a secure session by authenticating to Spotify within a **headless** browser. (Chromium)
1. Generate a valid Json Web Token and store it until expiration.
1. The token will grant special actions throughout its lifespan, once expired, the whole process is started over.

This can be used to create a Custom API from any website. <br>
#### Installation and configuration
```bash
git clone https://github.com/BelkaDev/Spotify-JWT ~/Spotify-JWT
cd ~/Spotify-JWT && npm i
```
To provide your credentials you need to set them as environement variables inside your .bashrc ( .zhshrc etc..), then refresh your shell. <br>
``` bash
export SPOTIFY_USER=""
export SPOTIFY_PWD=""
```
#### Running
Manually grab your access token: <br>
`node index.js` <br>
More examples including an automated API call can be found in the project.

##### todo:
* add demo
