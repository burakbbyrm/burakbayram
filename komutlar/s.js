const Discord = require('discord.js');
const db = require('quick.db');
exports.run = async function(client, msg, args) {
  let ayar = args[0];
  if(!ayar) {
  } else if(ayar == "aç") {
    let sistem = await db.fetch(`panell_${msg.guild.id}`);
    if(sistem || sistem == "açık") {
      msg.reply("ztn açık")
    } else {
      db.set(`panell_${msg.guild.id}`, "açık");
      msg.reply("tm")
    }
  } else if(ayar == "kapat") {
    let sistem = await db.fetch(`panell_${msg.guild.id}`);
    if(!sistem) {
      msg.reply("ztn kplı")
    } else {
      let panelID = db.fetch(`panelParentID_${msg.guild.id}`);
      let ch = client.channels.get(panelID);
      if(!ch) {
        let kanal = msg.guild.channels.find(c => c.name.startsWith(msg.guild.name))
        if(!kanal){
          
        } else {
          try{
            kanal.delete();
          }catch(e) {
            msg.channel.send("Bir hata var.")
          }
        }
      } else {
        
      }
      ch.delete();
      db.delete(`panelParentID_${msg.guild.id}`);
      db.delete(`panell_${msg.guild.id}`);
      msg.reply("tm");
      let toplamID = db.fetch(`toplamID_${msg.guild.id}`);
      let kanal = client.channels.get(toplamID);
      if(!kanal) {
        
      } else {
        kanal.delete();
        db.delete(`toplamID_${msg.guild.id}`);
      }
      let uyeID = db.fetch(`uyeSayıID_${msg.guild.id}`);
      let s = client.channels.get(uyeID);
      if(!s) {
      
      }
      s.delete();
      db.delete(`uyeSayıID_${msg.guild.id}`);
      let botID = db.fetch(`botSayıID_${msg.guild.id}`);
      let bb = client.channels.get(botID);
      if(!bb) {
        
      }
      bb.delete();
      db.delete(`botSayıID_${msg.guild.id}`);
      let idd = db.fetch(`onlSayıID_${msg.guild.id}`);
      let idD = client.channels.get(idd);
      console.log(idD.id)
      idD.delete();
      db.delete(`onlSayıID_${msg.guild.id}`)
      let sdd = db.fetch(`sesliID_${msg.guild.id}`);
      let kanalle = client.channels.get(sdd);
      if(!kanalle){
        
      }
      kanalle.delete();
      db.delete(`sesliID_${msg.guild.id}`);
      let sys = await db.fetch(`panell_${msg.guild.id}`);
      if(sys == "açık"){
        try{
          db.delete(`panell_${msg.guild.id}`)
        } catch(e) {
          
        }
      }
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: [], 
  permLevel: 0 
};

exports.help = {
  name: 'panel',
  description: 'Tüm komutları gösterir.',
  usage: 'panel'
};