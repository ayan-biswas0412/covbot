const Commando = require('discord.js-commando')
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
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
        },
        params:{
            pincode: pincode,
            date: date
        }

    })
      .then((res) => {
        // console.log('RES:', res.data)
        let dataArray = res.data.sessions;
        let dataArraylength = dataArray.length;
        let zeroslot_centers = 0;
        let total_available_centers = 0;

        if(dataArray.length === 0){
          message.reply("🥲🥲 Sorry !! Currently no vaccination centers available at your pincode "+pincode +' for date '+date);

        }else{
            
            dataArray.forEach(element => {
              
              if(element.available_capacity_dose1 > 0 || element.available_capacity_dose2 > 0){
                if(total_available_centers===0){
                  message.reply("🥳🥳 Hurray !! Vaccine Available!");
                  message.reply("Here is the list of available options at your pincode "+pincode+' for date '+date);
                }

                const VaccineCentreEmbed = {
                  color: '#0099ff',
                  title: 'Get Directions for '+element.name,
                  url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(element.address)}`,
                  description: 'Vaccination Center ID : '+element.center_id+', '+element.address+', '+element.block_name+', '+element.district_name+', '+element.state_name+'Pin : '+element.pincode,
                  fields: [
                    {
                      name:'Available for 👫',
                      value: 'Age group : '+element.min_age_limit +'+ '
                    },
                    {
                      name:'Available Vaccine 🏥',
                      value: element.vaccine + ' ( First Dose : '+ element.available_capacity_dose1+ ', Second Dose : '+element.available_capacity_dose2+' )'
                    },
                    {
                      name: 'Timings ⏰',
                      value: 'From ' + element.from+ ' To ' + element.to
                    },
                    {
                      name: 'Vaccine Fee 💰',
                      value: '₹ '+ element.fee
                    }
                  ]
                }
  
                message.reply({ embed: VaccineCentreEmbed });
                total_available_centers = total_available_centers+1; // for counting total number of avaialable centers

              }else{
                zeroslot_centers = zeroslot_centers+1;
              }

            });

            if(dataArraylength === zeroslot_centers){
              message.reply("🥲🥲 Sorry !! Currently no vaccination centers available at your pincode "+pincode +' for date '+date);
            }
        }
      })
      .catch((err) => {
        // console.error('ERR:', err) 
        message.reply(err.response.data.error);
      })
    }
}