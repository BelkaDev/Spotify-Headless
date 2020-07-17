## Spotify-JWT
 A [puppeteer](https://github.com/puppeteer/puppeteer) approach to intercept your validated Spotify OAuth token (alongside of the fingerprint) then reinject it to imitate a secure, browser-like traffic.
#### How it works
1. Establish a secure session by authenticating to Spotify within a *headless* browser. (Chromium)
1. Generate a valid Json Web Token and abuse it until expiration.
1. The access token allows you to make requests to the Spotify Web API on behalf of a user (throughout its lifespan), once expired, the whole process is started over.

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
More examples including an API call can be found in the project.

#### Usecase 
##### Data scraping 



##### Script automation 
##### exemple 1: create a local playlist, filter it, enqueue results:
![exemple 1](src/automation1.png)
##### exemple 2: set a timer, shuffle songs then transfer stream to phone:
![exemple 2](src/automation2.png)
