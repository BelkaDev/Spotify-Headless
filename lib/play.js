#! /usr/bin/env node

const
    tokenValidator = require('../lib/tokenValidator'),
    client = require('../lib/player'),
    readline = require('readline');
process = require('process');

main()

async function getToken(session) {
    await session.checkTokenValidity();
    if (!session.isAlive) {
        await session.generate()
    }
    return session.accessToken;
}

function getType(uri) {
    return uri.split(':')[1];
}

async function main() {
    var uris = []
    var list = []
    var context_uri = []
    var context = true
    var queued = false
    const isTTY = process.stdin.isTTY;
    const session = new tokenValidator();
    const token = await getToken(session);
    const player = new client(session);

    
    // READ FROM STDIN
    if (!isTTY) {
        var rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: false,
            prompt: '>',
            removeHistoryDuplicates: true
        });

        rl.on('line', async(line) => {
            list.push(line.split('| ')[0])
            line.split('| ').forEach(uri => {
                if (queued) return false
                var type = getType(uri)
                if (type === 'album' || type === 'artist' || type === 'playlist') {
                    context_uri.push(uri);
                    queued = true;
                } else if (type === 'track') {
                    uris.push(uri)
                    context = false;
                }
            })
        });
        rl.on('close', async() => {
            if (context) { await player.play(context_uri[0]);
            if(list[0]) console.log('Queued '+getType(context_uri[0])+':\n'+list[0])
            else console.log('Nothing found.')
             }
            else {
                await player.play(uris)
                console.log(list.join("\n"))
            }
        });
    } else {

    }
}