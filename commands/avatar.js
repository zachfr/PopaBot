const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if (args.length == 0) {
        try {
            message.channel.send(message.author.avatarURL());            
        } catch (error) {
            message.channel.send("Error: Did you have a profile picture?");            
        }
        return setTimeout(() => {
            message.delete();
        }, 1000)
    }
    else {
        try {
            member = message.mentions.users.first();
            message.channel.send(member.avatarURL());            
        } catch (error) {
            message.channel.send(error);
            message.channel.send("Error: Does the user have a profile picture?");
        }
        return setTimeout(() => {
            message.delete();
        }, 1000)
    }
}

module.exports.help = {
    name: "avatar",
    usage: "<Name>"
}
module.exports.aliases = []