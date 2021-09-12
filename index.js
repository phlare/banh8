const tmi = require('tmi.js');
require('dotenv').config();

const client = new tmi.Client({
  options: { debug: true },
  connection: {
    secure: true,
    reconnect: true
  },
  identity: {
    username: 'banh8',
    password: process.env.TWITCH_OAUTH_TOKEN
  },
  channels: ['banh8', 'phlare', 'j_blazed']
});

const regexBanList = [
  /manolia/,
  /h[o0][st]+[0-9\_]+/,
  /ryerher/
];

const obviouslySafeUserNames = [
  'and',
  'me'
];

const checkUser = (channel, username) => {
  // ok, now check username against our list of bannable fuckers
  // client.say(channel, `i see you, @${username}`);
  // if it's in our obviously safe list, ignore.
  if (obviouslySafeUserNames.indexOf(username) !== -1) {
    console.log(`ignoring ${username} because duh`);
    return;
  }
  console.log(`checking ${username} against bot lists...`);
  for (const banRegex of regexBanList) {
    const banMatch = username.toLowerCase().match(banRegex);
    if (banMatch) {
      client.say(channel, `spread love not hate, @${username}`);
      client.say(channel, `/ban ${username}`);
    }
  }
};

client.connect();

client.on('join', (channel, username) => {
  if (client.getUsername() === username) {
    client.say(channel, `banh8 checking in, ready for duty <3`);
  }
});

client.on('message', (channel, tags, message, self) => {
  // Ignore echoed messages.
  if(self) return;

  if(['follow','join'].indexOf(message) !== false) {
    // set of regex patterns to use to catch follower usernames from welcome messages
    const followRegexList = [
      /([a-z0-9_]+) has joined/,
      /([a-z0-9_]+) has followed/,
      /a wild ([a-z0-9_]+) appears/, // tabatha_sabbatha
      /follow,? ([a-z0-9_]+) ?!?/, // testing
      /following,? ([a-z0-9_]+) ?!?/, // default streamlabs follow message
      /following!? ([a-z0-9_]+) :\)/, // default streamelements follow message
    ];

    for (const followRegex of followRegexList) {
      const match = message.toLowerCase().match(followRegex);
      if (match && match.length > 1) {
        username = match[1];
        checkUser(channel, username);
      }
    }
  }

  // Ignore non-commands for now
  if(!message.startsWith('!')) {
    return;
  }

  const args = message.slice(1).split(' ');
  const command = args.shift().toLowerCase();

  if (command === 'banh8') {
    client.say(channel, `banh8 is a bot created by @Phlare to help fight the follow/hate bots running rampant lately. This is a work in progress, but if you wish to be added to the monitored channels, jump into phlare's discord and ask about it. https://discord.com/invite/aevtVaSBpN`)
  } else if(command === 'echo') {
    // client.say(channel, `@${tags.username}, you said: "${args.join(' ')}"`);
  } else if(command === 'hello') {
    // client.say(channel, `@${tags.username}, Yo what's up`);
  } else if(command === 'dice') {
    // const result = Math.floor(Math.random() * 6) + 1;
    // client.say(channel, `@${tags.username}, You rolled a ${result}.`);
  }

});