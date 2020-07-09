const 
  tokenValidator = require('./lib/tokenValidator')
main()
async function main() {
  const session = new tokenValidator();
  await session.checkTokenValidity();
  if (session.isAlive) {
  console.log('You have an ongoing valid session, skipping the logging process.');
} else
{
  console.log('Previous token expired or not retrieved, generating a new one.')
  await session.generate()
}
console.log('\nACCESS_TOKEN:'+session.accessToken);
}