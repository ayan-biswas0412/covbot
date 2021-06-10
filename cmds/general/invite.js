const Commando = require('discord.js-commando')
const config = require('../../config');

module.exports = class GeneralCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'invite',
      group: 'general',
      memberName: 'invite',
      description: 'Get the invite link for this bot (Cov Bot).'
    })
  }

  run = async (message) => {
    
    const InvitebotEmbed = {
        color: '#0099ff',
        title: "Click here to invite the bot in your server",
        url: config.botinviteUrl,
        description: "Install the bot and enjoy the all informations related to Covid19 in India at your fingertip",
        timestamp: new Date()
    }
    message.reply({ embed: InvitebotEmbed });

   
  }
}