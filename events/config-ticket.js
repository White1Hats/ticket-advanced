const Discord = require("discord.js");
const config = require("../config.json")
const embed = new Discord.EmbedBuilder()
.setColor("Default")
.setDescription("Ticket")



module.exports = {
    name: 'config-ticket',
    async execute(interaction, message, client) {


        if(interaction.customId === "add-titule"){

            interaction.deferUpdate();

            interaction.channel.send({
                content:"Qual sera o novo titulo?",
            }).then((msg1) => {
              const filter = (m) => m.author.id === interaction.user.id;
              const collector = msg1.channel.createMessageCollector({
                filter,
                max: 1,
              });

              collector.on("collect", (message) => {
                message.delete();
                embed.setTitle(message.content)
                msg1.edit("⏰ | Alterado!");
                setTimeout(() => {
                    msg1.delete();
                }, 1000);
              });
            });
        }
        
        if(interaction.customId === "add-footer"){

            interaction.deferUpdate();

            interaction.channel.send({
                content:"Qual sera o novo rodapé?",
            }).then((msg1) => {
              const filter = (m) => m.author.id === interaction.user.id;
              const collector = msg1.channel.createMessageCollector({
                filter,
                max: 1,
              });

              collector.on("collect", (message) => {
                message.delete();
                embed.setFooter({ text:`${message.content}`, iconURL:interaction.guild.iconURL() })
                
                msg1.edit("⏰ | Alterado!");
                setTimeout(() => {
                    msg1.delete();
                }, 1000);
              });
            });
        }
        if(interaction.customId === "add-image"){

            interaction.deferUpdate();

            interaction.channel.send({
                content:"Qual sera a nova imagem?",
            }).then((msg1) => {
              const filter = (m) => m.author.id === interaction.user.id;
              const collector = msg1.channel.createMessageCollector({
                filter,
                max: 1,
              });

              collector.on("collect", (message) => {
                message.delete();
                embed.setImage(message.content)

                msg1.edit("⏰ | Alterado!");
                setTimeout(() => {
                    msg1.delete();
                }, 1000);
              });
            });
        }
        if(interaction.customId === "enviar_ticket"){

            interaction.channel.send({
                embeds:[embed],
                components:[
                    new Discord.ActionRowBuilder()
                    .addComponents(
                        new Discord.ButtonBuilder()
                        .setCustomId("abrir-ticket")
                        .setLabel("Abrir ticket")
                        .setStyle(Discord.ButtonStyle.Secondary)
                    )
                ]
            }).then(() => {
                interaction.reply({
                    content:"enviado com sucesso",
                    ephemeral:true
                })
            })
        }
        if(interaction.customId === "alterar-desc"){

            interaction.deferUpdate();

            interaction.channel.send({
                content:"Qual sera a nova descrição?",
            }).then((msg1) => {
              const filter = (m) => m.author.id === interaction.user.id;
              const collector = msg1.channel.createMessageCollector({
                filter,
                max: 1,
              });

              collector.on("collect", (message) => {
                message.delete();
                embed.setDescription(message.content)

                msg1.edit("⏰ | Alterado!");
                setTimeout(() => {
                    msg1.delete();
                }, 1000);
              });
            });
        }

        if(interaction.customId === "reiniciar-ticket") {
            interaction.update({
                embeds:[
                    new Discord.EmbedBuilder()
                .setDescription("Configure o ticket antes de envia-lo"),
                embed
                ]
            })
        }
    }}