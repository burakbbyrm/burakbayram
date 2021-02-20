const Discord = require('discord.js');
const db = require('quick.db')
exports.run = (client, message, args) => { 
  

  
 //////////////////////////////// 
let kanal = message.mentions.channels.first() 

/////////////////////////////////////
 if (!message.member.hasPermission("ADMINISTRATOR"));
 
 if(!kanal) 
   message.channel.send(`başarılı`)

  
  db.set(`kanal_${message.guild.id}`, kanal)  

};
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: ['test2'], 
  permLevel: 0
};

exports.help = {
  name: 'test2',
  description: '-', 
  usage: '-'
};