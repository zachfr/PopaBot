const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    const embed = message.content.split("_").slice(1);
    const channelname = bot.channels.cache.get(embed[2]);
    console.log(embed);
    if (args.length == 0) return message.channel.send("Wrong usage: ");
    let a = new Discord.MessageEmbed()
        a.setTitle(embed[0])
        a.setDescription(embed[1])
        a.setFooter(message.author.username)
        a.setTimestamp()
        a.setColor(embed[3])
    channelname.send(a);
}

module.exports.help = {
    name: "embed",
    description: "Create a good embed",
    usage: "_Title_Descriptions_Channel-ID_Color"
}
module.exports.aliases = []