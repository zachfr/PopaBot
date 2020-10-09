const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    const ping = Date.now() - message.createdTimestamp;
    let embed = new Discord.MessageEmbed()
        .setTitle("Ping")
        .setDescription(`${ping * -1}ms`)
        .setTimestamp()
    message.channel.send(embed);
    return setTimeout(() => {
        message.delete();
    }, 1000)
}

module.exports.help = {
    name: "ping"
}
module.exports.aliases = []