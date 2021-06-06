const config = require('./config');
const path = require('path')
const Commando = require('discord.js-commando')

const client = new Commando.CommandoClient({
	owner: config.owner,
	commandPrefix: config.prefix,
})

client.on('ready', async () => {
	console.log('The client is ready!')
  
	client.registry
	  .registerGroups([
		['slot', 'slot availability commands'],
	  ])
	  .registerDefaults()
	  .registerCommandsIn(path.join(__dirname, 'cmds'))
})

client.login(config.token) 