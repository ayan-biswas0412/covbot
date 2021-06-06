const Commando = require('discord.js-commando')
const axios = require('axios')
const api = require('../../api');

module.exports = class SlotCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'slotavailable',
      group: 'slot',
      memberName: 'slotavailable',
      description: 'Displays all available slots',
    })
  }

  run = async (message) => {
    axios
      .get(api.mainApibaseUrl+'/appointment/sessions/public/findByPin',{
        params:{
            pincode:'743133',
            date:'09-06-2021'
        }

    })
      .then((res) => {
        console.log('RES:', res.data)
        let dataArray = res.data.sessions;

        if(dataArray.length ===0){
            message.reply("Currently no vaccination available at your pincode");
        }else{
            dataArray.forEach(element => {
                let messageText = element.vaccine+' at ' + element.name + ' from ' + element.from+ ' to ' + element.to +' , vaccination Charge : ₹ '+ element.fee +'.'
                message.reply(messageText);
                
            });

        }
        
      })
      .catch((err) => {
        console.error('ERR:', err) 
      })
    }
}