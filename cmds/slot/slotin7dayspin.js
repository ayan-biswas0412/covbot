const Commando = require('discord.js-commando')
const axios = require('axios')
const api = require('../../api');

module.exports = class SlotCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'slotin7dayspin',
      group: 'slot',
      memberName: 'slotin7dayspin',
      description: 'Displays all available slots in a Pincode for next 7 days from a given date',
      args: [
				{
					key: 'pincode',
					prompt: 'In which pincode you want to see the slot availability for next 7 days ?',
					type: 'string',
				},
                {
					key: 'date',
					prompt: 'From which date you want to see the slot availability for next 7 days ?',
					type: 'string',
				}
			],
    })
  }

  run = async (message,{ pincode,date }) => {
    axios
      .get(api.mainApibaseUrl+'/appointment/sessions/public/calendarByPin',{
        headers: {
          'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
        },
        params:{
            pincode: pincode,
            date: date
        }

    })
      .then((res) => {
        // console.log('RES:', res.data)
        let dataArray = res.data.centers;
        let total_available_centers = 0;

        if(dataArray.length === 0){
          message.reply("🥲🥲 Sorry !! Currently no vaccination centers available at your pincode "+pincode +' for date '+date);

        }else{
            
            dataArray.forEach(element => {

                let session_array = element.sessions;
                let slotArray = [];
                let this_centre_null = 0;

                session_array.forEach(element_session=>{
                    if(element_session.available_capacity_dose1 > 0 || element_session.available_capacity_dose2 > 0){
                        slotArray.push({
                            name:'Available on 🗓',
                            value: element_session.date,
                            inline: true
                        },
                        {
                            name:'Available for 👫',
                            value: 'Age group : '+element_session.min_age_limit +'+ ',
                            inline: true
                        },
                        {

                            name:'Available Vaccine 🏥',
                            value: element_session.vaccine + ' ( First Dose : '+ element_session.available_capacity_dose1+ ', Second Dose : '+element_session.available_capacity_dose2+')',
                            inline: true
                        })

                        this_centre_null = this_centre_null+1;
                    }

                });

                if(this_centre_null!=0){

                    const VaccineCentreEmbed = {
                        color: '#0099ff',
                        title: 'Get Directions for '+element.name,
                        url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(element.address)}`,
                        description: 'Vaccination Center ID : '+element.center_id+', '+element.address+', '+element.block_name+', '+element.district_name+', '+element.state_name+'Pin : '+element.pincode,
                        fields: slotArray
                      }
        
                      message.reply({ embed: VaccineCentreEmbed });
                      total_available_centers = total_available_centers+1;
                    
                }

            });

            if(total_available_centers ===0){
              message.reply("🥲🥲 Sorry !! Currently no vaccination centers available at your pincode "+pincode +' from date '+date+' to next seven days');
            }
        }
      })
      .catch((err) => {
        // console.error('ERR:', err) 
        message.reply(err.response.data.error);
      })
  }
}