const Commando = require('discord.js-commando')
const config = require('../../config');

module.exports = class GeneralCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'support',
      group: 'general',
      memberName: 'support',
      description: 'Please feel free to Open issues if you face any difficulties'
    })
  }

  run = async (message) => {
    
    const SupportEmbed = {
        color: '#0099ff',
        title: "Click here to open an issue regarding the bot",
        url: config.botGithubRepo+'/issues',
        description: "Please feel free to Open issues if you face any difficulties and also let me know if you want more features.I will be more than happy to help you",
    }
    message.reply({ embed: SupportEmbed });

   
  }
}