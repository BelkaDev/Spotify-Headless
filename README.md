## Spotify-JWT
 A Puppeteer approach to intercept Spotify OAuth token (alongside of fingerprints) to imitate a regular,secured, browser-based traffic.
#### How it works
1. Establish a secure session by authenticating to Spotify within a **headless** browser. ( [Chromium](https://github.com/puppeteer/puppeteer) )
1. Generate a valid Json Web Token and store it until expiration.
1. The token will grant special actions throughout its lifespan, once expired, the whole process is started over.
#### Installation and configuration
```bash
git clone https://github.com/BelkaDev/Spotify-JWT ~/Spotify-JWT
cd ~/Spotify-JWT && npm i
```
To provide your credentials you need to set them as environement variables inside your .bashrc ( .zhshrc etc..), then refresh your shell.
``` bash
export SPOTIFY_USER=""
export SPOTIFY_PWD=""
```
#### Running
Manually grab your access token:
`node index.js`
More examples including an automated API call can be found in the project.

##### todo:
* add demo
