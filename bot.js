var Discord = require("discord.js");
var client = new Discord.Client();

 
client.on("ready", () => {
    console.log("I'm ready to do work!");
});
 
const slowmode_mentions = new Map();
const slowmode_links = new Map();
const slowmode_attachments = new Map();
const ratelimit = 7500; // within 7.5 seconds
const logChannel = " CHANNEL ID HERE"; // logs channel id
 
client.on("message", message => {
 
    if (message.content.startsWith("!ping")) {
        let startTime = Date.now();
        message.channel.send("Ping...").then(newMessage => {
            let endTime = Date.now();
            newMessage.edit("Pong! Took `" + Math.round(endTime - startTime) + "ms`!");
        });
    }
 
    function log(logmessage) {
        if (message.guild.channels.has(logChannel)) {
            message.guild.channels.get(logChannel).send({ embed: logmessage}).then().catch(err => console.log(err));
        }
    }
 
   
    let banLevel = {
        "mentions": 10,
        "links": 10,
        "attachments": 10
    };
 
   
    if (message.author.bot || !message.guild || !message.member || !message.guild.member(client.user).hasPermission("BAN_MEMBERS") || message.member.hasPermission("MANAGE_MESSAGES")) return;
 
 
    if (message.mentions.users.size == 1 && message.mentions.users.first().bot) return;
 
   
    let entry_mentions = slowmode_mentions.get(message.author.id);
    let entry_links = slowmode_links.get(message.author.id);
    let entry_attachments = slowmode_attachments.get(message.author.id);
 
    if (!entry_mentions) {
        entry_mentions = 0;
        slowmode_mentions.set(message.author.id, entry_mentions);
    }
    if (!entry_links) {
        entry_links = 0;
        slowmode_links.set(message.author.id, entry_links);
    }
    if (!entry_attachments) {
        entry_attachments = 0;
        slowmode_attachments.set(message.author.id, entry_attachments);
    }
 
   
    entry_mentions += message.mentions.users.size + message.mentions.roles.size;
    entry_links += message.embeds.length;
    entry_attachments += message.attachments.size;
   
    slowmode_mentions.set(message.author.id, entry_mentions);
    slowmode_links.set(message.author.id, entry_links);
    slowmode_attachments.set(message.author.id, entry_attachments);
 
   
    if (entry_links > banLevel.links) {
        message.member.ban(1).then(member => {
            message.channel.send(`:ok_hand: banned \`${message.author.tag}\` for \`link spam\``);
            log(new Discord.RichEmbed().setTitle(':hammer: Banned').setColor(0xFF0000).setTimestamp().addField('User', `${message.author.tag} (${message.author.id})`).addField('Reason', `Posting too many links (${entry_links}x)`));
            slowmode_links.delete(message.author.id);
        })
        .catch(e => {
            log(new Discord.RichEmbed().setTitle(':x: ERROR').setColor(0x000001).setTimestamp().addField('User', `${message.author.tag} (${message.author.id})`).addField('Reason', `Could not ban because they have a higher role`));
        });
    } else {
        setTimeout(()=> {
            entry_links -= message.embeds.length;
            if(entry_links <= 0) slowmode_links.delete(message.author.id);
        }, ratelimit);
    }
 
    if (entry_mentions > banLevel.mentions) {
        message.member.ban(1).then(member => {
            message.channel.send(`:ok_hand: banned \`${message.author.tag}\` for \`mention spam\``);
            log(new Discord.RichEmbed().setTitle(':hammer: Banned').setColor(0xFF0000).setTimestamp().addField('User', `${message.author.tag} (${message.author.id})`).addField('Reason', `Mentioning too many users (${entry_mentions}x)`));
            slowmode_mentions.delete(message.author.id);
        })
        .catch(e => {
            log(new Discord.RichEmbed().setTitle(':x: ERROR').setColor(0x000001).setTimestamp().addField('User', `${message.author.tag} (${message.author.id})`).addField('Reason', `Could not ban because they have a higher role`));
        });
    } else {
        setTimeout(()=> {
            entry_mentions -= message.mentions.users.size + message.mentions.roles.size;
            if(entry_mentions <= 0) slowmode_mentions.delete(message.author.id);
        }, ratelimit);
    }
 
    if (entry_attachments > banLevel.attachments) {
        message.member.ban(1).then(member => {
            message.channel.send(`:ok_hand: banned \`${message.author.tag}\` for \`image spam\``);
            log(new Discord.RichEmbed().setTitle(':hammer: Banned').setColor(0xFF0000).setTimestamp().addField('User', `${message.author.tag} (${message.author.id})`).addField('Reason', `Posting too many images (${entry_attachments}x)`));
            slowmode_attachments.delete(message.author.id);
        })
        .catch(e => {
            log(new Discord.RichEmbed().setTitle(':x: ERROR').setColor(0x000001).setTimestamp().addField('User', `${message.author.tag} (${message.author.id})`).addField('Reason', `Could not ban because they have a higher role`));
        });
    } else {
        setTimeout(()=> {
            entry_attachments -= message.attachments.size;
            if(entry_attachments <= 0) slowmode_attachments.delete(message.author.id);
        }, ratelimit);
    }
 
});
 
process.on("unhandledRejection", err => {
    console.error("Uncaught Promise Error: \n" + err.stack);
});

let banse = new Set();
  client.on('guildBanAdd', function(guild) {
    guild.fetchAuditLogs().then(logs => {
      const ser = logs.entries.first().executor;
      if(!bane[ser.id+guild.id]) bane[ser.id+guild.id] = {
        bans: 2
      }
      let boner = bane[ser.id+guild.id]
  banse.add(ser.id)
  boner.bans = Math.floor(boner.bans+1)
 
 
  setTimeout(() => {
    boner.bans = 2
    banse.delete(ser.id)
  },8000)
 
  if(boner.bans > 2) {
    let roles = guild.members.get(ser.id).roles.array()
  guild.members.get(ser.id).removeRoles(roles)
  }
 
      })
          const memberban = client.channels.find("name", "hack-log")
     memberban.send(`**WARNING : SOMEBOT TRY TO HACKING OUR SERVER !**`)
      fs.writeFile('./alpha.json', JSON.stringify(bane), (err) => {
  if (err) console.error(err);
  })
 
  })
  client.on('guildMemberRemove', (u) => {
      u.guild.fetchAuditLogs().then( s => {
          var ss = s.entries.first();
          if (ss.action == `MEMBER_KICK`) {
          if (!data[ss.executor.id]) {
              data[ss.executor.id] = {
              time : 1
            };
        } else {  
            data[ss.executor.id].time+=1
        };
  data[ss.executor.id].time = 0
  u.guild.members.get(ss.executor.id).roles.forEach(r => {
                  r.edit({
                      permissions : []
                  });
                  data[ss.executor.id].time = 0
              });
          setTimeout(function(){
              if (data[ss.executor.id].time <= 3) {
                  data[ss.executor.id].time = 0
              }
          })
      };
      });
          const memberkick = client.channels.find("name", "hack-log")
      memberkick.send(`**WARNING : SOMEBOT TRY TO HACKING OUR SERVER !**`)
      fs.writeFile("./data.json", JSON.stringify(data) ,(err) =>{
          if (err) console.log(err.message);
      });
  });
  client.on('roleDelete', (u) => {
      u.guild.fetchAuditLogs().then( s => {
          var ss = s.entries.first();
          if (ss.action == `ROLE_DELETE`) {
          if (!data[ss.executor.id]) {
              data[ss.executor.id] = {
              time : 1
            };
        } else {
            data[ss.executor.id].time+=1
        };
  data[ss.executor.id].time = 0
  u.guild.members.get(ss.executor.id).roles.forEach(r => {
                  r.edit({
                      permissions : []
                  });
                  data[ss.executor.id].time = 0
              });
          setTimeout(function(){
              if (data[ss.executor.id].time <= 3) {
                  data[ss.executor.id].time = 0
              }
          },60000)
              const roledeletes = client.channels.find("name", "hack-log")
      roledeletes.send(`**WARNING : SOMEBOT TRY TO HACKING OUR SERVER !**`)
      };
      });
      fs.writeFile("./data.json", JSON.stringify(data) ,(err) =>{
          if (err) console.log(err.message);
      });
  });
  client.on('channelDelete', (u) => {
      u.guild.fetchAuditLogs().then( s => {
          var ss = s.entries.first();
          if (ss.action == `CHANNEL_DELETE`) {
          if (!data[ss.executor.id]) {
              data[ss.executor.id] = {
              time : 1
            };
        } else {
            data[ss.executor.id].time+=1
        };
  data[ss.executor.id].time = 0
  u.guild.members.get(ss.executor.id).roles.forEach(r => {
                  r.edit({
                      permissions : []
                  });
                  data[ss.executor.id].time = 0
              });
          setTimeout(function(){
              if (data[ss.executor.id].time <= 3) {
                  data[ss.executor.id].time = 0
              }
          })
             var trying = client.channels.find("name", "hack-log")
      trying.send(`**WARNING : SOMEBOT TRY TO HACKING OUR SERVER !**`)
      };
      });
      fs.writeFile("./data.json", JSON.stringify(data) ,(err) =>{
          if (err) console.log(err.message);
      });
  })
  client.on("message",(message) => {
      if(message.content.startsWith(prefix + "antihack")) {
          if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply("** You Don't Have Permission `Manage channels` To Do This Command");
          message.guild.createChannel("hack-log").then(c => {
              message.channel.send("** Done I Created Channel Named hack-log To Start The AntiHack**");
          });
           }})
           client.on('ready', () => {
      console.log(`Logged in as ${client.user.tag}!`);
    });
 
    var guilds = require('./guild.json')
    client.on('guildBanAdd', function(guild) {
                const rebellog = client.channels.find("name", "hack-log"),
                Onumber = 3,
      Otime = 10000
    guild.fetchAuditLogs({
        type: 22
    }).then(audit => {
        let banner = audit.entries.map(banner => banner.executor.id)
        let bans = guilds[guild.id + banner].bans || 0
        guilds[guild.id + banner] = {
            bans: 0
        }
          bans[guilds.id].bans += 1;
    if(guilds[guild.id + banner].bans >= Onumber) {
    try {
    let roles = guild.members.get(banner).roles.array();
    guild.members.get(banner).removeRoles(roles);
      guild.guild.member(banner).kick();
   
    } catch (error) {
    console.log(error)
    try {
    guild.members.get(banner).ban();
      rebellog.send(`
      WARNING : SOMEBOT TRY TO HACKING OUR SERVER !`);
    guild.owner.send(`
    WARNING : SOMEBOT TRY TO HACKING OUR SERVER !`)
        setTimeout(() => {
     guilds[guild.id].bans = 0;
      },Otime)
    } catch (error) {
    console.log(error)
    }
    }
    }
    })
    });
     let channelc = require('./channelc.json')
      client.on('channelCreate', async (channel) => {
      const rebellog = client.channels.find("name", "hack-log"),
      Oguild = channel.guild,
      Onumber = 3,
      Otime = 10000;
      const audit = await channel.guild.fetchAuditLogs({limit: 1});
      const channelcreate = audit.entries.first().executor;
      console.log(` A ${channel.type} Channel called ${channel.name} was Created By ${channelcreate.tag}`);
       if(!channelc[channelcreate.id]) {
        channelc[channelcreate.id] = {
        created : 0
         }
     }
     channelc[channelcreate.id].created += 1;
     if(channelc[channelcreate.id].created >= Onumber ) {
        Oguild.members.get(channelcreate.id).kick();
    rebellog.send(`
    WARNING : SOMEBOT TRY TO HACKING OUR SERVER !`);
    channel.guild.owner.send(`
    WARNING : SOMEBOT TRY TO HACKING OUR SERVER !`)
    }
      setTimeout(() => {
     channelc[channelcreate.id].created = 0;
      },Otime)
      });
   
    let channelr = require('./channelr.json')
      client.on('channelDelete', async (channel) => {
      const rebellog = client.channels.find("name", "hack-log"),
      Oguild = channel.guild,
      Onumber = 3,
      Otime = 10000;
      const audit = await channel.guild.fetchAuditLogs({limit: 1});
      const channelremover = audit.entries.first().executor;
      console.log(` A ${channel.type} Channel called ${channel.name} was deleted By ${channelremover.tag}`);
       if(!channelr[channelremover.id]) {
        channelr[channelremover.id] = {
        deleted : 0
         }
     }
     channelr[channelremover.id].deleted += 1;
     if(channelr[channelremover.id].deleted >= Onumber ) {
      Oguild.guild.member(channelremover).kick();
    rebellog.send(`
    WARNING : SOMEBOT TRY TO HACKING OUR SERVER !`);
    channel.guild.owner.send(`
    WARNING : SOMEBOT TRY TO HACKING OUR SERVER !`)
    }
      setTimeout(() => {
     channelr[channelremover.id].deleted = 0;
      },Otime)
      });

client.login(process.env.BOT_TOKEN);
