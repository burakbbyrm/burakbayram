const Discord = require('discord.js');
exports.run = (client, message, args) => {
    const yaz = new Discord.RichEmbed()
      .setColor("RED")
    .setThumbnail('https://i.pinimg.com/originals/0c/d0/50/0cd050f9da29f85baeb214b4eb487100.gif')
     .setTitle("Why am I here?")
    .addField("\n\nSo what should I do?", "There's nothing we can do right now. Please come back when your account has expired **twenty-four hours** to register with Discord.")
    .setFooter("BlackHouse +18 Protection System")
    .setDescription("> This server has a system for blocking **fake accounts**. You can't join this server with an account opened in twenty-four hours.")
    return message.channel.sendEmbed(yaz);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [''],
  permLevel: 0
}; 
 
exports.help = {
  name: 'yazing',
  description: '',
  usage: ''
};

 

