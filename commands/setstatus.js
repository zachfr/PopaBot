const Discord = require("discord.js");
const bot = new  Discord.Client();
const Keyv = require('keyv');
const status = new Keyv('mysql://PopaBot:zwvgbWb0uVB082oS@sql.zachfr.com:3306/PopaBot');

module.exports.run = async (bot, message, args) => {
    if (message.author.id === '277242592801062913') {
        if (args.length == 0) {
            const stats = await status.get('status');
            message.channel.send(`The bot status is `+"`"+ `${stats}`+"`"+" \nYou define status of bot with `!status <status>`");
            return setTimeout( async () => {
                message.delete();
            }, 1000)
        } 
        if (args.length == 1) {
            const activity = message.content.split(" ").slice(1).join(" ");
            await status.set('status', activity);
            setTimeout( async () => {
                message.delete();
                const stats = await status.get('status');
                bot.user.setActivity(stats);
                message.channel.send(`You have been set status to `+"`"+ `${stats}`+"`");
                console.log(stats);
            }, 1000)
        }
    }
}

module.exports.help = {
    name: "status"
}
module.exports.aliases = []