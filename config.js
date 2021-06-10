require('dotenv').config()

module.exports = {
    prefix: "-",
	token: process.env.TOKEN,
    owner: process.env.OWNER,
    newsapi: process.env.NEWSAPI,
    botinviteUrl: "https://discord.com/api/oauth2/authorize?client_id=851047707182891038&permissions=0&scope=bot",
    botGithubRepo:"https://github.com/ayan-biswas0412/covbot",
};