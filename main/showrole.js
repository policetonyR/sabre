const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"

exports.run = (client, msg, params) => {
      let color = 0x000000,
      let member = msg.guild.members.get(msg.author.id);
      if (member) {
          color = member.highestRole.hexColor;
      }
  msg.channel.send({embed: {
    color: color,
    timestamp: new Date(),
    fields: [
      {
        name: `${msg.member.displayName},`,
        value: `You have ${member.highestRole} permissions.`
      }
    ]
  }})
};

/*
enabled, guildOnly, aliases, permission level
*/
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['rcol', 'highrole'],
  permLevel: 1
};

/*
name, desc., usage
name is also the command alias
*/
exports.help = {
  name: 'showrole',
  description: 'Displays your highest role and role color.',
  usage: 'showrole'
};
