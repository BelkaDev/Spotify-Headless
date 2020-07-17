const tokenValidator = require('../lib/tokenValidator')
const
    BASE_URL = 'api.spotify.com',
    USER_AGENT = "User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:71.0) Gecko/20100101 Firefox/71.0";

async function getToken(session) {
    await session.checkTokenValidity();
    if (!session.isAlive) {
        await session.generate()
    }
    return session.accessToken;
}

async function main() {
    const session = new tokenValidator();
    const token = await getToken(session);
    const arg = process.argv.slice(2).join(' ');
    const deviceType = process.argv.slice(1)[1];
    const result = await session.sendRequest('/v1/me/player/devices')
    var found = false;
    if (!deviceType) {
        console.log(result);
    } else if (deviceType.toUpperCase() === "COMPUTER") {
        result.devices.forEach((device) => {
            if (!found && device.type === 'Computer') {
                console.log(device.id);
                found = true;
            }
        })
    } else if (["MOBILE", "PHONE"].includes(deviceType.toUpperCase())) {
        result.devices.forEach((device) => {
            if (!found && device.type === 'Tablet') {
                console.log(device.id);
                found = true;
            }
        })

    } else if (deviceType.toUpperCase() === "BROWSER") {
        result.devices.forEach((device) => {
            if (!found && device.name.includes('Web')) {
                console.log(device.id);
                found = true;
            }
        })
    }

}

main()