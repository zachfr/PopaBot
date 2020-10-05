const Discord = require("discord.js");
const Keyv = require('keyv');
const keyv = new Keyv('mysql://PopaBot:zwvgbWb0uVB082oS@sql.zachfr.com:3306/PopaBot');

module.exports.run = async (bot, message, args) => {
    var prefix = (await keyv.get(`Prefix.${message.guild.id}`));
    const data = [];
    const { commands } = message.client;

    if (!args.length) {
	    data.push('Here\'s a list of all my commands:\n ');
        data.push(commands.map(command => command.help.name).join(', '));
        data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);

        return message.channel.send(data);
    }
    const name = args[0].toLowerCase();
    const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

    if (!command) {
	    return message.reply('That\'s not a valid command!');
    }

    data.push(`**Name:** ${command.help.name}`);

    if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
    if (command.help.description) data.push(`**Description:** ${command.help.description}`);
    if (command.help.usage) data.push(`**Usage:** ${prefix}${command.help.name} ${command.help.usage}`);

    //data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

    message.channel.send(data, { split: true });
}

module.exports.help = {
    name: "help",
    description: "Show help Center with command",
    //usage: ""
}
module.exports.aliases = ["h"]