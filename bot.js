const Discord = require("discord.js");
const fs = require("fs");
const Keyv = require('keyv');
const bot = new Discord.Client();
const config = require("./config.json");
const auth = require("./auth.json");
const keyv = new Keyv('mysql://PopaBot:zwvgbWb0uVB082oS@sql.zachfr.com:3306/PopaBot');
console.log("Popa loading")
console.log(config)

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

bot.login(auth.token);
keyv.on('error', err => console.error('Keyv connection error:', err));


fs.readdir("./commands/", (err, files) => {
    if (err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if (jsfile.length <= 0) {
        console.log("No commands found!");
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${f} Ok!`);
        bot.commands.set(props.help.name, props);
        if (!props.aliases) return
        props.aliases.forEach(alias => {
            bot.aliases.set(alias, props.help.name);
        });
    })
})

bot.on("ready", async () => {
    console.log("Popa start");
    const status = await keyv.get('status');
    bot.user.setActivity(status);
});
bot.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;
    if (await keyv.get(`Prefix.${message.guild.id}`)) {
        var prefix = (await keyv.get(`Prefix.${message.guild.id}`));
    }else {
        var prefix = config.prefix;
    }
    
    if(!message.content.startsWith(prefix)) return;

    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.splice(1);

    if (bot.aliases.has(command.slice(prefix.length).toLowerCase())) bot.commands.get(bot.aliases.get(command.slice(prefix.length).toLowerCase())).run(bot, message, args, prefix)
    if (bot.commands.has(command.slice(prefix.length).toLowerCase())) bot.commands.get(command.slice(prefix.length).toLowerCase()).run(bot, message, args, prefix)

});