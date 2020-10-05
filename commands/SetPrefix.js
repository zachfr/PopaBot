const Discord = require("discord.js");
const Keyv = require('keyv');
const StaffRole = new Keyv('mysql://PopaBot:zwvgbWb0uVB082oS@sql.zachfr.com:3306/PopaBot');

module.exports.run = async (bot, message, args) => {
    if (message.member.hasPermission('ADMINISTRATOR')) {
        if (args.length == 0) return message.channel.send("Wrong usage: `!setprefix <Prefix>`");
        const Prefix = args[0];
        console.log(Prefix);
        await StaffRole.set(`Prefix.${message.guild.id}`, args[0]);
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