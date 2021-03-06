const settings = require('../settings.json');
const Discord = require ("discord.js");
var exec = require('child_process').exec;
exports.run = (client, message, params) => {
  exec(`uptime | awk {'print $2,$3,$4,$5'}`,
    function(error, stdout, stderr) {
      const millis = new Date().getTime() - message.guild.createdAt.getTime();
      const days = Math.floor(millis / 1000 / 60 / 60 / 24);
      message.channel.send({ embed: {
        color: 0x009DC4,
        timestamp: new Date(),
        description: `v${settings.version}`,
        author: {
          name: client.user.username,
          icon_url: client.user.avatarURL
        },
        fields: [
          {
            name: `This Server: ${message.guild.name}`,
            value: `:minidisc: Memory Usage: **${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB**\n:tropical_fish: Serving: **${client.users.size} Users**\n:wave: Active Users in This Server: **${message.guild.members.filter(m => m.presence.status !== 'offline').size} / ${message.guild.memberCount}**\n:satellite: Servers: **${client.guilds.size}**\n:biohazard: Channels: **${client.channels.size}**\n:city_dusk: Region: **${message.guild.region}**\n:calendar_spiral: Server Created: **${days}** Days Ago.\n:gear: Node: ${process.version}\n:white_sun_small_cloud: Server Uptime: **${stdout}**`
          }
        ]
      }})
    })

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['stat'],
  permLevel: 0
};

exports.help = {
  name: 'stats',
  description: 'Displays statistical data on the Bot.',
  usage: 'stats'
};
