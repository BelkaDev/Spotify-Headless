## Spotify-JWT
 A [puppeteer](https://github.com/puppeteer/puppeteer) procedure to intercept your OAuth-validated Spotify JWT (alongside of the fingerprint) then reinject it to imitate a secure, User-like traffic.
#### How it works
1. Establish a secure session by authenticating to Spotify within a headless browser. (Puppeteer) <br>
~~2. Generate a valid Json Web Token and abuse it until expiration.~~ <br>
~~3. Restart operation.~~
2. Export the session cookies, in particular one that serves as the refresh token that lasts for one year.
3. The access token allows you to perform actions on behalf of a user throughout its lifespan, once expired it is recycled by the refresh token.
4. In the event of reaching its expiration date, refresh token must be reproduced either manually or by starting this process all over <br>
taking about 30s <i> every year </i>, and thus making it a viable solution.

#### Installation and configuration
```bash
git clone https://github.com/BelkaDev/Spotify-JWT ~/Spotify-JWT
cd ~/Spotify-JWT && npm i
```
To provide your credentials you need to set them as environement variables within your .bashrc (accordingly any shell config file) <br>
``` bash
export SPOTIFY_USER=""
export SPOTIFY_PWD=""
```
#### Running
Manually grab your access token: <br>
`node index.js` <br>
More examples are included to showcase the extent of the application (searching, controlling playback, transfering streams..) </br>
See below for practical uses.

#### Use case
##### Data scraping 
![scraping](src/scraping.png)
###### Script automation 
###### aka the sole puporse of the project, it offers an immense flexibility especially when combining aliases
###### example 1: create a local playlist, filter it, feed stdout to queue:
![example 1](src/automation1.png)
###### example 2: set a timer, shuffle songs then transfer ongoing stream to your mobile device:
![example 2](src/automation2.png)


