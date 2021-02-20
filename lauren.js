const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const moment = require("moment");
var Jimp = require("jimp");
const { Client, Util } = require("discord.js");
const weather = require("weather-js");
const fs = require("fs");
const db = require("quick.db");
const http = require("http");
const express = require("express");
require("./util/eventLoader")(client);
const path = require("path");
const request = require("request");
const snekfetch = require("snekfetch");
const queue = new Map();
const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");

const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping tamamdır.");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(ayarlar.token);

client.on("guildMemberAdd", async member => {
  let kanal = await db.fetch(`kanal_${member.guild.id}`);
  if (!kanal) return;
  let hgmsj = await db.fetch(`hoşgeldinmesaj_${member.guild.id}`);
  let bbmsj = await db.fetch(`bbmesaj_${member.guild.id}`);

  ///....

  ///....
  if (!hgmsj) {
    client.channels
      .get(kanal)
      .send(
        ":loudspeaker: :inbox_tray: Kullanıcı Katıldı!` " +
          member.guild.memberCount +
          "` Kişiyiz! `" +
          member.user.username +
          "`"
      );
  }

  if (hgmsj) {
    var mesajs = await db
      .fetch(`hoşgeldinmesaj_${member.guild.id}`)
      .replace("-uye-", `${member.user.tag}`)
      .replace("-server-", `${member.guild.name}`)
      .replace("-uyesayısı-", `${member.guild.memberCount}`)
      .replace("-lauren-", `${member.user.id}`)
      .replace("-lauren2-", `<@${member.user.id}>`)
          .replace("-lauren3-", `${moment(member.user.createdAt).format("DD/MM/YYYY | HH:mm:ss")}`)
      .replace();

    client.channels.get(kanal.id).send(mesajs);
    return;
  }
});
client.on("guildMemberRemove", async member => {
  let açkapat = await db.fetch(`açkapat_${member.guild.id}`);
  let kanal = await db.fetch(`kanal_${member.guild.id}`);

  let hgmsj = await db.fetch(`hoşgeldinmesaj_${member.guild.id}`);
  let bbmsj = await db.fetch(`bbmesaj_${member.guild.id}`);

  ///....

  if (!kanal) return;

  if (member.bot) return;
  ///....

  if (!bbmsj) {
    client.channels
        "Kullanıcı Ayrıldı.`" +
          member.guild.memberCount +
          "` Kişiyiz!  `" +
          member.user.username +
          "`"
      
    return;
  }

  if (bbmsj) {
    var mesajs = await db
      .fetch(`bbmesaj_${member.guild.id}`)
      .replace("-uye-", `${member.user.tag}`)
      .replace("-server-", `${member.guild.name}`)
      .replace("-uyesayısı-", `${member.guild.memberCount}`)
      .replace("-lauren-", `${member.user.id}`)
      .replace("-lauren2-", `<@${member.user.id}>`)
      .replace();

    client.channels.get(kanal.id).send(mesajs);
  }
});

client.login(ayarlar.token);



client.on("message", async (msg) => {
  let ever = msg.guild.roles.find(c => c.name === "@everyone")
	let sistem = await db.fetch(`panell_${msg.guild.id}`);
	if(sistem == "açık") {
		let kategori = msg.guild.channels.find(c => c.name.startsWith(msg.guild.name));
		if(!kategori) {
			msg.guild.createChannel(`${msg.guild.name} | Sunucu Paneli`, {
				type: 'category',
				permissionOverwrites: [{
					id: msg.guild.id,
					deny: ['CONNECT']
				}]
			}).then(parent => {
        setTimeout(async function() {
          let eo = msg.guild.roles.find(r => r.name == "@everyone")
          parent.overwritePermissions(eo, {
            CONNECT: false
          })
          setTimeout(async function() {
            parent.setPosition(0);
          })
          db.set(`panelParentID_${msg.guild.id}`, parent.id);
          let toplamUye = msg.guild.channels.find(c => c.name.startsWith('Toplam Üye •'));
          if(!toplamUye) {
            try {
              let s = msg.guild.memberCount;
              msg.guild.createChannel(`Toplam Üye • ${s}`, {
                type: 'voice'
              }).then(ch => {
                setTimeout(function() {
                  ch.overwritePermissions(ever, {
                    CONNECT: false
                  })
                  db.set(`toplamID_${msg.guild.id}`, ch.id)
                  ch.setParent(parent);
                  ch.setPosition(1);
                }, 120)
              })
            } catch (err) {

            }
          }
        let uyesayısı = msg.guild.channels.find(c => c.name.startsWith('Üye Sayısı •'));
        if(!uyesayısı) {
          try {
            let uyesayı = msg.guild.members.filter(m => !m.user.bot).size;
            msg.guild.createChannel(`Üye Sayısı • ${uyesayı}`, {
              type: 'voice'
            }).then(ch => {
              let ever = msg.guild.roles.find(role => role.name === "@everyone")
                setTimeout(function() {
                ch.overwritePermissions(ever, {
                  CONNECT: false
                })
                ch.setParent(parent);
                ch.setPosition(2);
                db.set(`uyeSayıID_${msg.guild.id}`, ch.id);
              }, 120)
            })
          } catch (err) {

          }
          let botsayı = msg.guild.members.filter(m => m.user.bot).size;
          try {
            msg.guild.createChannel(`Bot Sayısı • ${botsayı}`, {
              type: 'voice'
            }).then(ch => {
              let ever = msg.guild.roles.find(role => role.name === "@everyone")
              setTimeout(function() {
                ch.overwritePermissions(ever, {
                  CONNECT: false
                })
                ch.setParent(parent);
                ch.setPosition(3);
                db.set(`botSayıID_${msg.guild.id}`, ch.id);
              }, 120)
            })
          } catch (err) {

          }
          let onl = msg.guild.members.filter(m => m.presence.status != "offline" && !m.user.bot).size;
          try {

            msg.guild.createChannel(`Çevrimiçi Üye • ${onl}`, {
              type: 'voice'
            }).then(ch => {
              let ever = msg.guild.roles.find(role => role.name === "@everyone");
              setTimeout(function() {
                ch.setParent(parent);
                ch.setPosition(4);
                db.set(`onlSayıID_${msg.guild.id}`, ch.id);
                ch.overwritePermissions(ever, {
                  CONNECT: false
                })
              }, 120)
          })
        } catch (err) {
          
        }
      }
        }, 50)
			})
		} else {
      let parent = msg.guild.channels.find(c => c.name == `${msg.guild.name}`)
      if(msg.content.includes('panel kapat')) return false;
      let toplamuye = msg.guild.channels.find(c => c.name.startsWith(`Toplam Üye -`));
      toplamuye.setParent(parent);
      toplamuye.setName(`Toplam Üye • ${msg.guild.memberCount}`);
      let botuye = msg.guild.channels.find(c => c.name.startsWith(`Bot Sayısı -`));
      botuye.setParent(parent);
      botuye.setName(`Bot Sayısı • ${msg.guild.members.filter(m => m.user.bot).size}`);
      let onl = msg.guild.channels.find(c => c.name.startsWith('Çevrimiçi Üye -'));
      onl.setParent(parent);
      onl.setName(`Çevrimiçi Üye • ${msg.guild.members.filter(m => m.presence.status != "offline" && !m.user.bot).size}`);
		}
	} else {

	}
})  

client.on("message", msg => {
  let onl = msg.guild.members.filter(m => m.presence.status != "offline" && !m.user.bot).size;
  let onl2 = msg.guild.members.filter(m => m.presence.status != "offline" ).size;
  let a = msg.guild.members.filter(m => msg.guild.memberCount && !m.user.bot).size;
                            let s = msg.guild.memberCount;     
  if (msg.content === "#üye") {
    msg.channel.send(`Botları **saymazsak,** şu anda **${a}** toplam üye, **${onl}** çevrimiçiyiz.\nBotlar ile **beraber** toplam **${s}** üye, **${onl2}** çevrimiçiyiz.`)
  }
});   





client.on("ready", () => {
    console.log(`Calisiyorum.`);
});

 client.on('guildMemberAdd' , member => {
    console.log(`Bir üye sunucumuza katıldı.`);
    let a = client.channels.get("")
    const tarih = member.user.createdAt;
    const suphelirol = member.guild.roles.get("");

    if (Date.now() - member.user.createdAt < 1000*60*60*24) {
        member.addRole(suphelirol);
 }});
 
 client.login();