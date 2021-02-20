const Discord = require('discord.js');
const db = require('quick.db')
exports.run = (client, message, args) => { 
    if (!message.member.hasPermission("ADMINISTRATOR"));
  
  let mesaj = args.slice(0).join(' ');

 message.channel.send('`'+mesaj+'` salak herif komut yazsana?') 
 db.set(`hoşgeldinmesaj_${message.guild.id}`, mesaj)  
};
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: [''], 
  permLevel: 0
};

exports.help = {
  name: 'test',
  description: '-', 
  usage: '-'
};