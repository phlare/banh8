const tmi = require('tmi.js');
require('dotenv').config();

const client = new tmi.Client({
  connection: {
    secure: true,
    reconnect: true
  },
  channels: [ 'j_blazed' ]
});

client.connect();

console.log('Now the value for TWITCH_OAUTH_TOKEN is:', process.env.TWITCH_OAUTH_TOKEN);

client.on('message', (channel, tags, message, self) => {
  console.log(`${tags['display-name']}: ${message}`);
});