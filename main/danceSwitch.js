const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"

function scoreUpTicket(mess, xval) {
  if (!xval) var xval = 1
  sql.get(`SELECT * FROM scores WHERE userId = "${mess.author.id}"`).then(row => {
    sql.run(`UPDATE scores SET tickets = ${row.tickets + xval*1} WHERE userId = ${mess.author.id}`)
  })
}
function scoreDownTicket(mess, xval) {
  if (!xval) var xval = 1
  console.log(chalk.gray("Lowering ticket score by", xval*1, mess.author.id), mess.author.tag)
  sql.get(`SELECT * FROM scores WHERE userId = "${mess.author.id}"`).then(row => {
    if (row.tickets*1 >= xval*1) {
      sql.run(`UPDATE scores SET tickets = ${row.tickets - xval*1} WHERE userId = ${mess.author.id}`)
    } else {
      sql.run(`UPDATE scores SET tickets = 0 WHERE userId = "${mess.author.id}"`)
    }
  })
}
function scoreUpBits(mess, xval) {
  if (!xval) var xval = 1
  sql.get(`SELECT * FROM scores WHERE userId = "${mess.author.id}"`).then(row => {
    sql.run(`UPDATE scores SET chatBits = ${row.chatBits + xval*1} WHERE userId = ${mess.author.id}`)
  })
}
function scoreDownBits(mess, xval) {
  if (!xval) var xval = 1
  console.log(chalk.gray("Lowering byte score by", xval*1, mess.author.id), mess.author.tag)
  sql.get(`SELECT * FROM scores WHERE userId = "${mess.author.id}"`).then(row => {
    if (row.chatBits*1 >= xval*1) {
      sql.run(`UPDATE scores SET chatBits = ${row.chatBits - xval*1} WHERE userId = ${mess.author.id}`)
    } else {
      sql.run(`UPDATE scores SET chatBits = 0 WHERE userId = ${mess.author.id}`)
    }
  })
}
function Rand(data) {
  // where data is the array
  return data[Math.floor(Math.random() * data.length)]
}
////////////////////////////////////////////////////////////////////////////////
// exports.run
////////////////////////////////////////////////////////////////////////////////

exports.run = (client, message, params) => {
  if (params[0] === "on") {
    var danceRole = message.guild.roles.find("name", "Partymode!")
    if (!danceRole || danceRole === undefined) {
      message.guild.createRole().then(role => {
        role.edit({
              name: "Partymode!",
              color: 0xcc0000,
              mentionable: true
            })
      })
      .then(() => {
        let danceRoom = message.guild.channels.find("name", "dancefloor")
        if (!danceRoom || danceRoom === undefined) {
          message.guild.createChannel('dancefloor', 'text').then(ch => {
            //var danceRole = message.guild.roles.find("name", "Partymode!")
            ch.overwritePermissions(message.guild.roles.find("name", "Partymode!"), {
              READ_MESSAGES: true,
              SEND_MESSAGES: true,
              READ_MESSAGE_HISTORY: true,
              MENTION_EVERYONE: true,
              EMBED_LINKS: true,
              ATTACH_FILES: true
            })
            ch.overwritePermissions(message.guild.id, {
              READ_MESSAGES: false,
              SEND_MESSAGES: false
            })
          })
        }
        message.reply(`\`DANCE MODE ENABLED\``)
      })
    }
  }
  if (params[0] === "off") {
    let danceRole = message.guild.roles.find("name", "Partymode!")
    let danceRoom = message.guild.channels.find("name", "dancefloor")
    if (danceRole !== undefined && danceRole !== null) {
      danceRole.delete()
    }
    if (danceRoom !== undefined && danceRoom !== null) {
      danceRoom.delete()
    }
    message.reply(`\`DANCE MODE DISABLED\``)
  }
  if (params[0] === "nominate") {
    let danceRole = message.guild.roles.find("name", "Partymode!")
    if (message.mentions.members.first() !== undefined && danceRole !== undefined && danceRole !== null) {
      var users = message.mentions.members.map(u => u.addRole(danceRole))
      message.reply(`\`Done\``)
    } else {
      return message.reply(`\`ERROR\` No Mentions / Role to Give`)
    }
  }
  // Everything that happens
};

/*
enabled, guildOnly, aliases, permission level
*/
exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: ['dance', 'dancemode', 'party', 'partymode'],
  permLevel: 4
};

/*
name, desc., usage
name is also the command alias
*/
exports.help = {
  name: 'danceswitch',
  description: 'It\'s everyone\'s favorite party room!',
  usage: 'danceswitch [nominate/on/off] (@users)'
};
