const Config = () => {
  switch(process.env.NODE_ENV){
    case 'dev':
      return {
        client: {
          options: { debug: true },
          connection: {
            secure: true,
            reconnect: true
          },
          identity: {
            username: 'banh8',
            password: process.env.TWITCH_OAUTH_TOKEN
          },
          channels: [
            'phlarecloud',
            // 'phlare',
            // 'j_blazed',
            // 'kingjayfps',
            // 'sabi_gaming',
            // 'pinkbubbblez',
            // 'bosmang4beltalowda'
          ]
        }
      };

    case 'prod':
      return {
        client: {
          options: { debug: true },
          connection: {
            secure: true,
            reconnect: true
          },
          identity: {
            username: 'banh8',
            password: process.env.TWITCH_OAUTH_TOKEN
          },
          channels: [
            // 'banh8',
            'phlare',
            'j_blazed',
            'kingjayfps',
            'sabi_gaming',
            'pinkbubbblez',
            'bosmang4beltalowda',
            'bigpoppacomi'
          ]
        }
      };

    default:
      return {
        client: {
          options: { debug: true },
          connection: {
            secure: true,
            reconnect: true
          },
          identity: {
            username: 'banh8',
            password: process.env.TWITCH_OAUTH_TOKEN
          },
          channels: [
            'banh8',
            // 'phlare',
            // 'j_blazed',
            // 'kingjayfps',
            // 'sabi_gaming',
            // 'pinkbubbblez',
            // 'bosmang4beltalowda'
          ]
        }
      };
  }
};
module.exports = Config();
