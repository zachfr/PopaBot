const Discord = require("discord.js");
const auth = require("../auth.json");
const Keyv = require('keyv');
const prefix = new Keyv(auth.mysql);

module.exports.run = async (bot, message, args) => {
    if (message.member.hasPermission('ADMINISTRATOR')) {
        if (args.length == 0) return message.channel.send("Wrong usagee: `!setprefix <Prefix>`");
        const Prefix = args[0];
        console.log(Prefix);
        await prefix.set(`Prefix.${message.guild.id}`, args[0]);
        return message.channel.send("You have been set prefix to " + "`" + args[0] + "`");
    }else {
        message.channel.send("Errors: You don't have permission to do that");
    }
}

module.exports.help = {
    name: "setprefix",
    usage: "<Prefix>"
}
module.exports.aliases = []