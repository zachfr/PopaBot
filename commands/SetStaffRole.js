const Discord = require("discord.js");
const Keyv = require('keyv');
const StaffRole = new Keyv('mysql://PopaBot:zwvgbWb0uVB082oS@sql.zachfr.com:3306/PopaBot');

module.exports.run = async (bot, message, args) => {
    if (message.member.hasPermission('ADMINISTRATOR')) {
        if (args.length == 0) return message.channel.send("Wrong usage: `!setstaffrole <RoleId>`");
        const RoleId = args[0];
        console.log(RoleId);
        console.log(message.guild.id);
        await StaffRole.set(`StaffRole.${message.guild.id}`, args[0]);
        const staffname = message.guild.roles.cache.get(args[0]);
        return message.channel.send("You have been set staff role to " + "`" + staffname.name + "`");
    }else {
        message.channel.send("Errors: You don't have permission to do that");
    }
}

module.exports.help = {
    name: "setstaffrole",
    usage: "<RoleId>"
}
module.exports.aliases = []