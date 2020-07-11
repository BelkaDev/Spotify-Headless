const tokenValidator = require('./lib/tokenValidator')
main().then((JWT) => { console.log('ACCESS_TOKEN:'+JWT) });
async function main() {
  const session = new tokenValidator();
  await session.checkTokenValidity();
  if (!session.isAlive) {
  console.log('Previous token expired or not found, generating a new one.');
  await session.generate();
}
return (session.accessToken);
}