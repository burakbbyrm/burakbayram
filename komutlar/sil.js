const Discord = require('discord.js');





exports.run = function(client, message, args) {
  message.delete("1")
if(!message.member.hasPermission(`MANAGE_GUILD`)) return message.channel.send(`YETKİN YOK OROSPU ÇOCUĞU?`)
  const sayi = args.slice(0).join('');

  

if(sayi.length < 1) {

  return message.reply("NE KADAR MESAJ SİLECEĞİM OROSPUNUN ÇOCUĞU?")

} else {

  message.channel.bulkDelete(sayi);

message.channel.send("**" + sayi + "** kadar mesajı ananın amına fırlattım.").then(msg => {

    msg.delete(5000)

});

}





};



exports.conf = {

  enabled: true, 

  guildOnly: false, 

  aliases: ["sil"],

  permLevel: 0 

};



exports.help = {

  name: 'temizle', 

  description: 'Belirtilen miktarda mesaj siler',

  usage: 'temizle <miktar>'

};