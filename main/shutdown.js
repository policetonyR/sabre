const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"

exports.run = (client, message, params) => {
  if (message.author.id === settings.ownerid) {
    if (params[0] !== "dewit") {
      message.reply(`\`FATAL ERROR\` DOESN'T WANNA \`DEWIT\``)
    } else {
      message.channel.send(`\`EMERGENCY SHUTDOWN\` Goodbye :wave:`).then(() => {
        process.exit(666)
      })
    }

  } else {
    message.reply(`\`FATAL ERROR\` NOT OWNER!`)
  }
};

/*
enabled, guildOnly, aliases, permission level
*/
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['shutoff'],
  permLevel: 4
};

/*
name, desc., usage
name is also the command alias
*/
exports.help = {
  name: 'shutdown',
  description: 'Emergency Shutdown. OWNER ONLY!',
  usage: 'shutdown dewit'
};
