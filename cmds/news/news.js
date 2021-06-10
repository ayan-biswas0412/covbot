const Commando = require('discord.js-commando')
const axios = require('axios')
const api = require('../../api');
const config = require('../../config');

module.exports = class NewsCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'news',
      group: 'news',
      memberName: 'news',
      description: 'Displays all available helthcare news of India'
    })
  }

  run = async (message) => {
    axios
      .get(api.newsApibaseUrl,{
        params:{
            country: "in",
            category: "health",
            q:"covid",
            apiKey: config.newsapi
        }

    })
      .then((res) => {
        let dataArray = res.data.articles;
        let dataArraylength = dataArray.length;
        let i=0;

        for(i=0;i<6;i++){
            let randomnews = Math.floor((Math.random() * dataArraylength) + 0);
            let thisNews = dataArray[randomnews];
            const CovidIndiaNewsEmbed = {
                color: '#0099ff',
                title: thisNews.title,
                url: thisNews.url,
                description: thisNews.description,
                fields: [
                  {
                    name:'Published at ⏰',
                    value: thisNews.publishedAt
                  }
                ]
            }
            message.reply({ embed: CovidIndiaNewsEmbed });


        }
        
      })
      .catch((err) => {
        console.error('ERR:', err) 
        message.reply(err.response.data.error);
      })
    }
}