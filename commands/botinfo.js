const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if (message.author.id === '277242592801062913') {
        var botserver = bot.guilds.cache.size;
        var botuser = bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0);
        message.channel.send(`Bot is in ${botserver} server for ${botuser} users`);
    }
}

module.exports.help = {
    name: "botinfo"
}
module.exports.aliases = []