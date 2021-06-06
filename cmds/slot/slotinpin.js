const Commando = require('discord.js-commando')
const Discord = require('discord.js');
const axios = require('axios')
const api = require('../../api');

module.exports = class SlotCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'slotinpin',
      group: 'slot',
      memberName: 'slotinpin',
      description: 'Displays all available slots in a Pincode',
      args: [
				{
					key: 'pincode',
					prompt: 'In which pincode you want to see the slot availability ?',
					type: 'string',
				},
        {
					key: 'date',
					prompt: 'For which date you want to see the slot availability ?',
					type: 'string',
				}
			],
    })
  }

  run = async (message,{ pincode,date }) => {
    axios
      .get(api.mainApibaseUrl+'/appointment/sessions/public/findByPin',{
        params:{
            pincode: pincode,
            date: date
        }

    })
      .then((res) => {
        console.log('RES:', res.data)
        let dataArray = res.data.sessions;

        if(dataArray.length ===0){
            message.reply("🥲🥲 Sorry !!");
            message.reply("Currently no vaccination available at your pincode "+pincode +' for date '+date);
        }else{
            message.reply("🥳🥳 Hurray !! Vaccine Available!");
            message.reply("Here is the list of available options at your pincode "+pincode+' for date '+date);
            dataArray.forEach(element => {
                let directionLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(element.address)}`;
                const GetDirectionEmbed = new Discord.MessageEmbed()
                  .setColor('#0099ff')
                  .setTitle('Get Directions for '+element.name)
                  .setURL(directionLink)
                
                let messageText = element.vaccine+' at ' + element.name + ' from ' + element.from+ ' to ' + element.to +' ,vaccination Charge : ₹ '+ element.fee
                message.reply(messageText);
                message.embed(GetDirectionEmbed)
                
            });

        }
        
      })
      .catch((err) => {
        console.error('ERR:', err) 
        message.reply(err.response.data.error);
      })
    }
}