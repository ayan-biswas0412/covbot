const Commando = require('discord.js-commando')
const config = require('../../config');

module.exports = class GeneralCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'about',
      group: 'general',
      memberName: 'about',
      description: 'Show the informations related to the bot'
    })
  }

  run = async (message) => {
    

    const AboutEmbed = {
        color: '#0099ff',
        title: "CovBot Github Repository",
        url: config.botGithubRepo,
        description: "The bot is completely open sourced and looking for your support, plese feel free to open issues and also please give suggestions for new ideas in the issue section",
    }
    message.reply({ embed: AboutEmbed });

   
  }
}