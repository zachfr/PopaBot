const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    message.channel.send(`Hey <@${message.author.id}>`);
}

module.exports.help = {
    name: "hey"
}
module.exports.aliases = ["hi", "salut", "allo", "yo"]