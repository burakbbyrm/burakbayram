const Discord = require('discord.js');
exports.run = (client, message, args) => {
    const yaz = new Discord.RichEmbed()
      .setColor("RED")
    .setThumbnail('https://i.pinimg.com/originals/0c/d0/50/0cd050f9da29f85baeb214b4eb487100.gif')
     .setTitle("Neden buradayım?")
    .addField("\n\nPeki ne yapmam gerekiyor?", "Şu anlık yapabileceğimiz bir şey yok. Lütfen hesabının Discord'a kayıt olma süresi **yirmi dört saati** geçince tekrar gel.")
    .setFooter("BlackHouse +18 - Koruma Sistemi")
    .setDescription("> Bu sunucuda **fake hesap**ları engelleme sistemi bulunuyor. Yirmi dört saat içinde açılmış bir hesapla bu sunucuya katılamazsın.")
    return message.channel.sendEmbed(yaz);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [''],
  permLevel: 0
};
 
exports.help = {
  name: 'yaz',
  description: '',
  usage: ''
};

 

