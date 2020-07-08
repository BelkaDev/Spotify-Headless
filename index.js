const 
  tokenValidator = require('./lib/tokenValidator')
main()
async function main() {
  const session = new tokenValidator();
  await session.checkTokenValidity();
  if (session.isAlive) {
  console.log('You have an ongoing valid session, skipping the logging process.');
  console.log('ACCESS_TOKEN: '+session.accessToken);
  return;
} else
{
  console.log('Previous token expired or not retrieved, generating a new one.')
  await session.generate()
  console.log('\nACCESS_TOKEN:'+session.accessToken);
  (session.accessToken) ?  console.log('\nSuccess. (Exiting)') : console.log('\nError while getting the token.')
}
}