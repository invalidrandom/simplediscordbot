// This code is fully open source and can be used by anyone for free, read license, it also is fully documented and organized
// It works in my machine >:)

//Please do not touch this, may break the code
const { Client, Intents } = require('discord.js');
const fetch = require("node-fetch")
const Database = require("@replit/database")
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
//Require the config file
const config = require("./config.json");
//Require the commands file
const moment = require("moment");
moment.locale("en-gb")
//Server keep alive function
const keepAlive = require("./server")
//Fun time start here, all the code is documented

//Message when bot start
//Feel free to modify this as much as you want from now on
//Of you want to request a new command, message us
client.on('ready', () => {
  //Warns who is logged in
  console.log(`Logged in as ${client.user.tag}!`);
  //Initialization status
  console.log(`I have been initialized, with ${client.users.size} users, in ${client.channels.size} channels, in ${client.guilds.size} servers.`);
  //Says how many servers the bot is working at in "Activity" section
  client.user.setActivity('I am in ${client.guilds.size} servers!');
  //Bot description, default instructing the user to use the help command
  client.user.setPresence({ game: { name: 'use !help to see my commands', type: 1, url: 'https://twitter.com/invalid_random'} });
});

//Ping message
//###############################################################################################################################################
    client.on('message', message => {
      //Trigger
  if (message.content === '!ping') {  
       message.channel.send('Pong');
       //Expose the ping
    message.channel.send(`🏓Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
  }
});
//##################################################################################################################################################

//Help message, change this part to use a message you like
//##################################################################################################################################################
client.on('message', message => {
  //Trigger
	if (message.content == '!help') {
  message.channel.send('check default commands:')
    const embed = new Discord.RichEmbed()
    //To change the emojis use :emojiname: (see the name in discord by tipying ':')
            .setTitle(':cat: **Need some help? Watch our commands!**')
            .addBlankField()
            .setColor('RANDOM')
            .addField('⚙️ **Moderation commands** ⚙️')
            .addField('👉 **!anounce**: ', 'Send a message tagging all users in the server (admin role required).')
            .addField('👉 **!ban**: ', 'Used to ban an user (admin role required).')
            .addField('👉 **!changelog**: ', 'Used to say if we have new members in the team.')
            .addField('👉 **!clear**: ', 'used to clean a certain number of messages in the chat.')
            .addBlankField()
            .addField('📮 **Info commands** 📮')
            .addField('👉 **!ping**: ', 'See the ping I am in now.')
            .addField('👉 **!owner**: ', 'See who created this bot.')
            .addBlankField()
            .addField('🏓 **Fun commands** 🏓')
            .addField('👉 **!kiss**: ', 'Kiss any user you want!')
            .addField('👉 **!hit**: ', 'Hit any user, yes, ***any*** user >:)')
            .addField('👉 **!kill**: ', 'I normally choose peace but...')
            .addField('👉 **!run**: ', 'Run from someone.')
            .addBlankField()
            .setFooter(` Any problems? message us on twitter. https://twitter.com/Invalid_Random`)
        message.author.send(embed);
        message.delete().catch();
        //Disable this part to disable DM in the message author's account
      message.channel.send(`${message.author}, you got that in dm too :D`)
  }
}
);
//##################################################################################################################################################

//Kiss command
//##################################################################################################################################################
client.on('message', message => {
  //Trigger
if (message.content == '!kiss') {
    let user = message.mentions.users.first();
    //In case the command is executed in a wrong manner
           if(!user) return message.channel.send(`${message.author} you need to mention someone to kiss!`);
           //Gifs goes here
           let gifs = ['https://media1.tenor.com/images/78095c007974aceb72b91aeb7ee54a71/tenor.gif?itemid=5095865', 'https://i.pinimg.com/originals/ec/89/36/ec8936fc307d2cd3c71c6100a99dfc0d.gif', 'https://gifimage.net/wp-content/uploads/2017/09/anime-forehead-kiss-gif-10.gif'] 
           //Math random is not really random but will work here :)
           let random = Math.round(Math.random() * gifs.length);
           //New embed
           let embed = new Discord.RichEmbed()
           //Gif title
               .setTitle(`😍 | ${message.author.username} kissed ${user.username}.`)
               //Randomly select a gif
               .setImage(gifs[gifs.length == 1 ? 0 : random == 0 ? random + 1 : random - 1])
               //Tag who sent the command
               .setFooter(`Comand sent by: ${message.author.tag}`, message.author.displayAvatarURL)
               //Set a random color at the embed
               .setColor('RANDOM')
               .setTimestamp()
               //Delete the message command
               message.delete();
               //Send message as an embed
               message.channel.send(embed);
}
}
);
//All the gifs commands have the same structure, so we won't document everything again, only gif and error message
//##################################################################################################################################################

//Hit command
//##################################################################################################################################################
client.on('message', message => {
if (message.content == '!hit') {
    let user = message.mentions.users.first();
    //In case the command is executed in a wrong manner
           if(!user) return message.channel.send(`${message.author}, you need to mention someone to hit!`);
           //Gifs goes here
           let gifs = ['https://media1.tenor.com/images/f9f121a46229ea904209a07cae362b3e/tenor.gif?itemid=7859254'] 
           let random = Math.round(Math.random() * gifs.length);
           let embed = new Discord.RichEmbed()
               .setTitle(`😈 | ${message.author.username} has hit ${user.username}.`)
               .setImage(gifs[gifs.length == 1 ? 0 : random == 0 ? random + 1 : random - 1])
               .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL)
               .setColor('RANDOM')
               .setTimestamp()
               message.delete();
               message.channel.send(embed);
}
}
);
//##################################################################################################################################################

//Kill command
//##################################################################################################################################################
client.on('message', message => {
if (message.content == '!kill') {
  let user = message.mentions.users.first();
  //In case the command is executed in a wrong manner
         if(!user) return message.channel.send(`${message.author}, you need to mention someone to kill!`);
         //Gifs goes here
         let gifs = ['https://i.pinimg.com/originals/ba/74/be/ba74bee37501bfc3f7a2dd883f4738f8.gif'] 
         gifs[Math.round(Math.random() * gifs.length)];
         let embed = new Discord.RichEmbed()
             .setTitle(`😷 | ${message.author.username} killed ${user.username}.`)
             .setImage(gifs[gifs.length == 1 ? 0 : random == 0 ? random + 1 : random - 1])
             .setFooter(`Sent by: ${message.author.tag}`, message.author.displayAvatarURL)
             .setColor('RANDOM')
             .setTimestamp()
             message.delete();
             message.channel.send(embed);
  }
});
//####################################################################################################################################################

//Run command
//####################################################################################################################################################
client.on('message', message => {
if (message.content == "!run") {
  let user = message.mentions.users.first();
  //In case the command is executed in a wrong manner
         if(!user) return message.channel.send(`${message.author}, you need to mention an user.`);
         //Gifs goes here
         let gifs = ['https://cdn.discordapp.com/attachments/534870528159121428/536945131312644115/tenor_1.gif'] 
         gifs[Math.round(Math.random() * gifs.length)];
         let embed = new Discord.RichEmbed()
             .setTitle(`😹 | ${message.author.username} runned from ${user.username}.`)
             .setImage(gifs[gifs.length == 1 ? 0 : random == 0 ? random + 1 : random - 1])
             .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL)
             .setColor('RANDOM')
             .setTimestamp()
             message.delete();
             message.channel.send(embed);
}
});
//####################################################################################################################################################

//Ban command
//####################################################################################################################################################
client.on('message', message => {
  //Trigger
if (message.content == '!ban') {
  var reason = args.slice(1).join(" ")
 
      var user = message.mentions.users.first();
      //Check if user has 'Ban_members' permission
      if(!message.guild.member(message.author.id).hasPermissions("BAN_MEMBERS")) return message.channel.send(`${message.author}, You do not have permission to do that! permission: **BAN_MEMBERS**.`);
      //In case of syntax error
      if(message.mentions.users.size < 1) return message.channel.send(`${message.author}, please, mention an user to ban.`);
      //Role error
      if(!message.guild.member(user).bannable) return message.channel.send(`${message.author}, I cannot ban this person! (Role error)`);
      //Asks a reason to ban
      if(reason.length < 1) return message.channel.send(`${message.author}, please tell us a reason to ban.`)  
 
      message.guild.member(user).ban()
 
     var discord = require ('discord.js')
 //Ban message, looks a mess but trust me it is organized and it works
     var embed = new discord.RichEmbed()
     .setTitle("❗️ A member has been banned:")
     .setColor("RANDOM")
     .setTimestamp()
     //Command requested
     .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL).setTimestamp()
     //Staff name
     .addField("**Staff:** " , message.author.username, true)
     //User tag
     .addField("**User:** " , user.username,true)
     //User ID
     .addField("**User ID:** " , user.id,true)
     .setThumbnail(message.author.displayAvatarURL).setTimestamp()
     //Reason
     .addField("**Reason:** " , reason, true);
     //Delete command
     message.delete();
 
 
     message.channel.send(embed)
}
});
//####################################################################################################################################################

//Clear command
//####################################################################################################################################################
client.on('message', message => {
  //Trigger
if(message.content == "!clear") {
  //Check admin permissions
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`${message.author}, unfortunately you do not have permission to use this.`)
  //Check how many messages to delete
  const deleteCount = parseInt(args[0], 10);
  //Minimum and max messages to delete
  if(!deleteCount || deleteCount < 2 || deleteCount > 100) return;
  //Start deleting
  const fetched = await message.channel.fetchMessages({limit: deleteCount + 1});
  message.channel.bulkDelete(fetched)
  //Success delete message
  message.channel.send(`${message.author}, ${deleteCount} messages has been successfully erased.`)
  .then((msg) => { msg.delete(5000
) }); 
}
}
);
//####################################################################################################################################################

//Avatar command
//####################################################################################################################################################
client.on('message', message => {
  //Trigger
if(message.content == "!avatar")  {
  //Delete message
  message.delete();
  const member = message.mentions.members.first() || message.guild.members.get(args[0]);
  //In case of syntax error
  if(!member) return message.reply("**Tell me an user to get profile picture.**")
 //Embed for avatar
  const embed = new Discord.RichEmbed()
  //Requested user profile tag
  .setAuthor(`${member.user.username}'s profile picture`)
  //Show picture
  .setImage(`${member.user.avatarURL}`)
  //Set Random color at the embed
  .setColor('RANDOM')
  //Who requested the pfp
  .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL);
 
  message.channel.send(embed);
}
});
//####################################################################################################################################################

//New members message
//####################################################################################################################################################
client.on('guildMemberAdd', member => {
  //Message when any new user enter
  client.channels.get('welcome ').send(`👉Be very wellcome, ${member}\n\n▫Read the rules at #rules.\n️️️️️️️️`)
  });
//####################################################################################################################################################

//Changelog command
//####################################################################################################################################################
client.on('message', message => {
  //Trigger
if(message.content == "!changelog") {
  //Delete message
  message.delete()
  //Start changelog
    const changelog = args.slice().join(' ');
    const datachangelog = moment().format('L');
    //Makes a new embed
    const changelogembed = new Discord.RichEmbed()
    .setTitle(`📋Changelog`)
    //Please change this color, I don't like it :(
    .setColor('#E9967A')  
    //Display changelog
    .addField("▫" + datachangelog, changelog)
    //React to changelog
    message.channel.send(changelogembed).then(async msg => {
      //Emojis at the reaction
    await msg.react("👍");
    await msg.react("❤");
    });
  }
}
);
//####################################################################################################################################################


//Announcement command
//####################################################################################################################################################
client.on('message', message => {
  //Trigger
if (message.content == "!announce") {
  message.delete();
//Check admin permissions
  if(!message.member.hasPermission("ADMINISTRATOR")) {
    //In case of permission error
      return message.channel.send(`**${message.author}** You do not have permission to use this command, necessary permission: **ADMINISTRATOR**.`);
  } else if (args.length === 0) {
    //In case of syntax error
      return message.channel.send(`**${message.author}**, you need to add a message after the command.`);
  } else {
    //Delete message
      message.delete()
      //Makes a new embed
      let embed = new Discord.RichEmbed()
      //Title
      .setTitle('📢 Announce:')
      //Message
      .setDescription(args.join(''))
      //Who used the command (Name and pfp)
      .setFooter(`Sent by: ${message.author.tag}`, message.author.displayAvatarURL).setTimestamp()
      //Set random color
      .setColor('RANDOM');
      //Send embed
      message.channel.send(embed);
  }
}
});
//####################################################################################################################################################

//Bot token can be found at discord developer's portal: https://discord.com/developers
//If you need help on building an application, turning it into a bot and getting the token, search for a tutorial at discord's developer portal/youtube

//WARNINNG: DO NOT SHARE ANY INFORMATION ABOUT YOUR BOT, SPECIALLY TOKEN, OTHERWISE ANYONE CAN HAVE ACCESSS TO YOUR APPLICATION

//Tips for code backup: You can upload the code to your github as a private or public repository, remember to erase the token before uploading
//For the token backup, save a file with it in your device at an encrypted/password locked folder or write it at a paper

//Your bot token goes here :D
client.login(process.env.TOKEN);
